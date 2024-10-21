import {Button as Ant4Button} from "antd4";
import {Button as Ant5Button} from "antd5";
import {useContext} from "react";
import {ThemeContext} from "../../App.tsx";
import {Themes} from "../types";
import * as ButtonStyles from "./Button.module.css";

export type ButtonProps = {
    label: string;
    onClick: () => void;
}
export const Button = ({label, onClick}: ButtonProps) => {
    const context = useContext(ThemeContext);
    return <>
        {context?.theme === Themes.V4 && <Ant4Button className={ButtonStyles.v4BtnDefault} onClick={onClick}>{label}</Ant4Button>}
        {context?.theme === Themes.V5 && <Ant5Button className={ButtonStyles.v5BtnDefault} onClick={onClick}>{label}</Ant5Button>}
    </>;
}
