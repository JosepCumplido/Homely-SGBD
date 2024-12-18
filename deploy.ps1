# Defineix la ruta de l'arrel del projecte (suposant que aquest script està a l'arrel)
$ProjectRoot = Get-Location

# Defineix la ruta de destinació absoluta per al build
$BuildDir = Join-Path $ProjectRoot "build"

if (Test-Path $BuildDir) {
    Remove-Item -Recurse -Force $BuildDir
}

New-Item -ItemType Directory -Path "$BuildDir/frontend" | Out-Null
New-Item -ItemType Directory -Path "$BuildDir/backend" | Out-Null

# 1. Empaqueta el frontend
Write-Host "Empaquetant el frontend..."

# Canvia al directori del frontend (client/my-app)
$FrontendDir = Join-Path $ProjectRoot "client/my-app"
Set-Location -Path $FrontendDir

# Instal·la les dependències i genera el build
Invoke-Expression "npm install"
Invoke-Expression "npm run build"

# Copia els fitxers generats (com .next, package.json, etc.) a la carpeta de destí
Copy-Item -Recurse -Path @(".next", "package.json", "package-lock.json") -Destination (Join-Path $BuildDir "frontend")

# Torna a l'arrel del projecte
Set-Location -Path $ProjectRoot

# 2. Empaqueta el backend
Write-Host "Empaquetant el backend..."
# Canvia al directori del backend (server)
$BackendDir = Join-Path $ProjectRoot "server"
Set-Location -Path $BackendDir

# Instal·la les dependències i genera el build
Invoke-Expression "npm install --omit=dev"

# Copia els fitxers generats a la carpeta de destí
Copy-Item -Recurse -Path @("*", "package.json", "package-lock.json") -Destination (Join-Path $BuildDir "backend")

# Torna a l'arrel del projecte
Set-Location -Path $ProjectRoot

# 3. Copia el mòdul shared
Write-Host "Copiant el modul shared..."
Copy-Item -Recurse -Path "./shared" -Destination (Join-Path $BuildDir "shared")

# 4. Comprimeix els fitxers per a la transferència
Write-Host "Comprimint els fitxers en build.tar.gz..."
if (-Not (Get-Command "tar" -ErrorAction SilentlyContinue)) {
    Write-Error "L'eina 'tar' no està disponible al sistema. Instal·la-la i torna a provar."
    Exit 1
}
Invoke-Expression "tar -czf build.tar.gz -C $BuildDir ."

Write-Host "Projecte empaquetat a build.tar.gz"

# Configuració del servidor
$ServerUser = "root"
$ServerHost = "88.223.95.53"
$DestDir = "/var/www/homely-sgbd"

# 5. Còpia del projecte al servidor
Write-Host "Copiant build.tar.gz al servidor..."
# Utilitzem SCP per copiar l'arxiu a través de PowerShell Remoting
scp build.tar.gz "${ServerUser}@${ServerHost}:/tmp"

# Execució remota mitjançant SSH
Write-Host "Descomprimint i executant al servidor..."
ssh "${ServerUser}@${ServerHost}" "
source ~/.nvm/nvm.sh
nvm use 18
mkdir -p $DestDir
tar -xzf /tmp/build.tar.gz -C $DestDir
cd $DestDir/frontend
npm install --omit=dev
pm2 delete ""homely-frontend""
pm2 start npm --name ""homely-frontend"" -- start &
cd $DestDir/backend
npm install
pm2 delete ""homely-backend""
pm2 start npm --name ""homely-backend"" -- start &
"

Write-Host "Projecte desplegat correctament!"