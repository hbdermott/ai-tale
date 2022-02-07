import { Box, Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css"
import Typist from "react-typist";
export default function Home() {
  const [storyOptions, setStoryOptions] = useState(['', '', '', '']);
  const [story, setStory] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
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

    // console.log(options);
    // console.log(`Story: ${story} ${option}`);

    setStoryOptions(options);
    setStory(story + ` ${option}`);
	setButtonLoading(false)

  }


  return (
		<div>
			<Head>
				<title key={4}>Tales</title>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
				<link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet"/>
			</Head>
			<Image
				className={styles.backgroundImage}
				src="/scroll2bg.jpg"
				layout="fill"
			/>
			<Center h="100vh" w="100vw" className={styles.body}>
				<Flex
					direction={"column"}
					justifyContent={"space-between"}
					alignItems={"center"}
					w={{ base: "95%", md: "80%", lg: "75%", xl: "70%" }}
					h="90%"
				>
					<Text
						shadow={"inner"}
						className={styles.story}
						py="5"
						rounded="lg"
						px="3"
						mb="2"
					>
						{story}
					</Text>
					<VStack direction={"column"} w="full" spacing={3}>
						{storyOptions.map((option, index) => (
							<Button
								key={index}
								w="full"
								isLoading={buttonLoading}
								// size="lg"
								fontSize={'2xl'}
								fontWeight={'regular'}
								height={{base: '80px', md: "70px", lg: "60px", xl: "50px"}}
								whiteSpace={"normal"}
								overflowWrap={"break-word"}
								colorScheme="whiteAlpha"
								color={'white'}
								onClick={(e) => {
									e.preventDefault();
									setButtonLoading(true);
									submitOption(option);
								}}
							>
								{option}
							</Button>
						))}
					</VStack>
				</Flex>
			</Center>
		</div>
	);
}

