import { useDispatch } from "react-redux";
import { createGame, setPlayerName } from "../store/hambreSlice";
import styled from "styled-components";
import { Button as ChakraButton } from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";

const WelcomePageBackground = styled.div`
    display: flex;
    background-image: url(/dale_background.webp);
    background-size: cover;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    flex-direction: column;
`;

const NameInput = styled.input`
    border: 3px solid black; 
    border-color: #53b6ac;
    background-color: rgb(64, 224, 208);
    height: 50px;
    width: 200px; 
    padding: 5px;
    margin-top: 5px;
    font-size: 16px;
    border-radius: 25px;
    &:focus {
    border-color: #7ffbf5;}
`;

const StartButton = styled(ChakraButton)`
    background: grey;
    border-radius: 25px;
    height: 30px;
    width: 100px;
    font-family: Super Bubble;
    color: white;
    &:disabled {

    }
`;

export function WelcomePage() {
    const [name, setName] = useState<string>("");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const dispatch = useDispatch();

    function onClick() {
        dispatch(setPlayerName(name));
        dispatch(createGame());
    };

    return (
        <WelcomePageBackground>
            <NameInput
                type="text"
                value={name} onChange={handleInputChange}
                placeholder="Enter player name"
            />
            <StartButton
                onClick={onClick}
                isDisabled={name === ""}
                _disabled={{ backgroundColor: "lightgrey", cursor: "not-allowed" }}
            >
                PLAY
            </StartButton>
        </WelcomePageBackground>
    );
};