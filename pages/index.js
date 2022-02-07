import { Box, Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css"
import Typist from "react-typist";
export default function Home() {
  const [storyOptions, setStoryOptions] = useState(['Sit tempor magna sed justo lorem ea accusam lorem et et. Ea eos sed takimata invidunt, dolore sed elitr sed.', '', '', '']);
  const [story, setStory] = useState('A to door our explore god a and for came chamber, perched and and tufted till. Still one vainly and nothing into. Of on all some soul some. Back rustling i i rare lordly. Yet croaking weak into of into you, and lie dream many came and said velvet hesitating and, still relevancy some and see by, i reclining let i the. That heart will prophet visiter said songs once. A word each the ancient hath parting lord, name the of my as came dying terrors respiterespite. Adore entrance guessing a this said. I my long not shorn my more raven the, betook bird the it implore front. The reply mystery nodded deep whose sainted bleak. Echo sitting and i at is and, at window placid bust turning from nightly human rare i, fiery whom i in madam before chamber echo for word. I front wrought i my friends. And one spoken thereat our and get the nevernevermore, grave into stood fancy thee and whom or burden dreaming, store above followed evilprophet my to forgiveness again. Some then sad friends this, silence an heart murmured i. On that dying i youhere liftednevermore lore the that i, volume these said days.');
  const [isLoaded, setLoaded] = useState(false);
    // useEffect(() => {
	//   async function fetchData() {
	// 		const storyStart = await fetch("/api/startStory", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		const start = await storyStart.json();

	// 		setStory(start.intro);

	// 		const initialOptions = await fetch("/api/generateOptions", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ story: start.intro }),
	// 		});
	// 		const data = await initialOptions.json();

	// 		let options = ["", "", "", ""];
	// 		data.options.forEach((choice, index) => {
	// 			options[index] = choice.text;
	// 		});
	// 		setStoryOptions(options);
	// 		setLoaded(true);
	//   }
    //   if(!isLoaded){
	// 	fetchData();
	//   }
    // }, [])

  async function submitOption(option) {
    
    // const response = await fetch("/api/generateOptions", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ story: story + ` ${option}` }),
	// 	});

    // const data = await response.json();

    // let options = ['', '', '', ''];
    // data.options.forEach((choice, index) => {
    //   options[index] = choice.text;
    // })

    // // console.log(options);
    // // console.log(`Story: ${story} ${option}`);

    // setStoryOptions(options);
    // setStory(story + ` ${option}`);

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
								// size="lg"
								fontSize={'2xl'}
								fontWeight={'regular'}
								height={{base: '80px', md: "70px", lg: "60px", xl: "50px"}}
								whiteSpace={"normal"}
								overflowWrap={"break-word"}
								onClick={(e) => {
									e.preventDefault();
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

