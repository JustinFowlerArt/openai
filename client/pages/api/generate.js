import { openai } from '../../config/openAi';

export default async function (req, res) {
    const completion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: req.body,
        temperature: 0.6,
        max_tokens: 100
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}
