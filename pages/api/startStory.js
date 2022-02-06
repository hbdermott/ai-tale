import openai from './initOpenAI'

export default async function (req, res) {
	const completion = await openai.createCompletion("text-curie-001", {
		prompt: "Write a couple sentences for the intro of a fantasy fiction novel",
		max_tokens: 64,
		frequency_penalty: 1.8,
		// temperature: 0.95,
	});
	res.status(200).json({ intro: completion.data.choices[0].text });
}
