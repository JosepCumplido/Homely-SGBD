import {User} from 'shared/models/user';

export default async function Home() {
    /*const user: User = {
        id: 1,
        name: "Josep"
    }*/
    const response = await fetch("http://localhost:4000/user", { cache: 'no-store' })
    const users: User[] = await response.json()

    return (
        <>
            <h1>Hello World</h1>
            <p>Usuaris:</p>
            <p>Usuaris:</p>
            <p>Usuaris:</p>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>
                        <p>{user.name}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}