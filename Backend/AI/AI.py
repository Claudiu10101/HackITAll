import openai

def ai_answer(query,system_promt):
    openai.api_key = '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'
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_promt},
                {"role": "user", "content": query}
            ]
        )
        return response.choices[0].message['content']
    except Exception as e:
        return str(e)

def vectorise (sample):
    answer = sample.split()
    return answer
def vectorise_space (sample):
    answer = sample.split()
    return answer
def vectorise_comma (sample):
    answer = sample.split(",")
    return answer    

