import {clsx} from "clsx";

export function FeatureSelector({label, selected, onClick}: { label: string, selected: boolean, onClick: () => void }) {
    return (
        <div
            className={clsx(
                "px-5 py-2 rounded-full m-[1px] border border-solid border-gray-400 w-max hover:border-gray-800 cursor-pointer",
                {
                    'border-gray-900 border-2 !m-0' : selected
                }
            )}
            onClick={onClick}
        >
            <p>{label}</p>
        </div>
    )
}