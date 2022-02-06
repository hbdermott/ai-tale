import { Box, Button, Center, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [storyOptions, setStoryOptions] = useState(['I don\'t like my name', 'I absolute love my name', 'My dad seems to be going insane', 'The last and final option']);
  const [story, setStory] = useState("My name is Christian Delamar no matter what my dad tells you.");

    // useEffect(() => {
    //   console.log(`Selected option: ${selectedOption}`);
    // }, [selectedOption])

  async function submitOption(option) {
    
    const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ story: story + ` ${option}` }),
		});

    const data = await response.json();

    let options = ['', '', '', ''];
    data.options.forEach((choice, index) => {
      options[index] = choice.text;
    })

    console.log(options);
    console.log(`Story: ${story} ${option}`);

    setStoryOptions(options);
    setStory(story + ` ${option}`);

  }

  return (
		<div>
			<Head>
				<title>Tales</title>
				<link rel="icon" href="/scroll.png" />
			</Head>

			<Center h="100vh" w="100vw">
				<Flex
					direction={"column"}
					justifyContent={"space-between"}
					alignItems={"center"}
					w="70%"
					h="90%"
				>
					<div>{story}</div>
						<VStack direction={"column"}>
							{storyOptions.map((option, index) => (
								<Button
									key={index}
                  w="600px"
									onClick={(e) => {
                    e.preventDefault();
										submitOption(option);
									}}
								>{option}</Button>
							))}
						</VStack>
				</Flex>
			</Center>
		</div>
	);
}
