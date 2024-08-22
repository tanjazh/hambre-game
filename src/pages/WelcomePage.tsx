import { useDispatch } from "react-redux";
import { createGame, setPlayerName } from "../store/hambreSlice";
import styled from "styled-components";
import { Button as ChakraButton, Flex } from "@chakra-ui/react";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { InfoComponent } from "../components/InfoComponent";

const WelcomePageBackground = styled.div`
    display: flex;
    background-image: url(${process.env.PUBLIC_URL}/dale_background.webp);
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
    width: 300px; 
    padding: 5px;
    margin-top: -20px;
    margin-bottom: 5px;
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
    const [showInfo, setShowInfo] = useState<boolean>(true);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && name !== "") {
            onClick();
        }
    };

    const dispatch = useDispatch();

    function onClick() {
        dispatch(setPlayerName(name));
        dispatch(createGame());
    };

    const handleContinue = () => {
        setShowInfo(false);
    };

    return (
        <WelcomePageBackground>
            {showInfo ? (
                <InfoComponent onContinue={handleContinue} />
            ) : (
                <>
                    <NameInput
                        type="text"
                        value={name}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter Player 1 name"
                    />
                    <StartButton
                        onClick={onClick}
                        isDisabled={name === ""}
                        _disabled={{ backgroundColor: "lightgrey", cursor: "not-allowed" }}
                    >
                        PLAY
                    </StartButton>
                </>
            )}
        </WelcomePageBackground>
    );
}
