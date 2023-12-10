import openai
import requests
import os

def image_generator(task, id):
    # Set your API key
    openai.api_key = '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'

    # Send the request to generate the image
    response = openai.Image.create(
        prompt=task,
        model="dall-e-3",
        size="1024x1024",
        n=1
    )

    # Extract the URL of the generated image
    image_url = response['data'][0]['url']

    # Download and save the image
    response = requests.get(image_url)
    image_path = os.path.join('presentation/', 'generated_image'+str(id)+'.jpg')

    with open(image_path, 'wb') as file:
        file.write(response.content)

    print(f"Image downloaded and saved to {image_path}")

# Example usage
# image_generator("A futuristic cityscape", 1)
