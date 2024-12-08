// Dependencies: pnpm install lucide-react

"use client";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Check, Eye, EyeOff, X} from "lucide-react";
import {useMemo, useState} from "react";

export default function PasswordInput({onPasswordChange}: { onPasswordChange: (password: string) => void }) {
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const checkStrength = (pass: string) => {
        const requirements = [
            {regex: /[a-zA-Z]/, text: "At least 1 letter"},
            {regex: /[0-9]/, text: "At least 1 number"},
            {regex: /.{6,}/, text: "At least 6 characters"},
            /*{ regex: /[A-Z]/, text: "At least 1 uppercase letter" },*/
        ];

        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password);

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border";
        if (score <= 1) return "bg-red-500";
        /*if (score <= 2) return "bg-orange-500";*/
        if (score === 2) return "bg-amber-500";
        return "bg-emerald-500";
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return "Enter a password";
        if (score <= 1) return "Weak password";
        if (score === 2) return "Medium password";
        if (score == 3) return "Strong password";
    };

    return (
        <div>
            {/* Password input field with toggle visibility button */}
            <div className="space-y-2">
                <Label htmlFor="password">Create new password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        className="pe-9"
                        placeholder="Strong password"
                        type={isVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            onPasswordChange(e.target.value)
                        }}
                        aria-invalid={strengthScore < 3}
                        aria-describedby="password-strength"
                    />
                    <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        aria-controls="password"
                    >
                        {isVisible ? (
                            <EyeOff size={16} strokeWidth={2} aria-hidden="true"/>
                        ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true"/>
                        )}
                    </button>
                </div>
            </div>

            {/* Password strength indicator */}
            <div
                className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{width: `${(strengthScore / 3) * 100}%`}}
                ></div>
            </div>

            {/* Password strength description */}
            <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
                {getStrengthText(strengthScore)}. Must contain:
            </p>

            {/* Password requirements list */}
            <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                            <Check size={16} className="text-emerald-500" aria-hidden="true"/>
                        ) : (
                            <X size={16} className="text-muted-foreground/80" aria-hidden="true"/>
                        )}
                        <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
              {req.text}
                            <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
