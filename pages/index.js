import { Box, Button, Center, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [storyOptions, setStoryOptions] = useState([]);
  const [story, setStory] = useState("");
  const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
	  async function fetchData() {
			const storyStart = await fetch("/api/startStory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const start = await storyStart.json();

			setStory(start.intro);

			const initialOptions = await fetch("/api/generateOptions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ story: start.intro }),
			});
			const data = await initialOptions.json();

			let options = ["", "", "", ""];
			data.options.forEach((choice, index) => {
				options[index] = choice.text;
			});
			setStoryOptions(options);
			setLoaded(true);
	  }
      if(!isLoaded){
		fetchData();
	  }
    }, [])

  async function submitOption(option) {
    
    const response = await fetch("/api/generateOptions", {
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
