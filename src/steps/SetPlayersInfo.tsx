import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from 'react';

interface PlayersInfoProps {
    onClickNext: (name: string) => void,
}

export function SetPlayersInfo(props: PlayersInfoProps) {
    const [name, setName] = useState<string>("")
    return (
        <Flex>
            <Heading as={"h1"} fontSize={"3xl"} position={"relative"}>
            </Heading>
            <Input
                placeholder='Name'
                size='lg'
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <Button
                onClick={() => props.onClickNext(name)}
                colorScheme='teal'
                variant='outline'
                position={"absolute"}
                rightIcon={<ChevronRightIcon />}>
                Button
            </Button>
        </Flex>
    )
}
