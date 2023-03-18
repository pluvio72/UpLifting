from bs4 import BeautifulSoup
import requests
import json
from urllib.parse import urlparse

pure_gym_base_url = "https://www.puregym.com"
pure_gym_gyms_url = "https://www.puregym.com/gyms/"

def makeSoup(url):
    req = requests.get(url)
    body = req.content
    return BeautifulSoup(body, "html.parser")

def get_pure_gyms():
    s = makeSoup(pure_gym_gyms_url)
    gym_list = s.find_all("a", class_="gym-card--search")
    output = []
    for gym in gym_list:
      href = pure_gym_base_url + gym["href"]
      gym_soup = makeSoup(href)
      name = gym.text
      address = gym_soup.find("button", class_="gym-address__link")
      if address:
        split = address.text.split(" ")
        post_code = f"{split[-1]} {split[-2]}"
        address = " ".join(split[:-2])
        print(f"Adding gym {gym.text}, address: {address}, post_code: {post_code}")
        output.append({ name: name.strip(), "brand": "Pure", address: address.strip(), post_code: post_code.strip() })
      else:
        print(f"Skipping gym {gym.text} missing title and address..")

def output_to_file(data):
  with open("../data/gyms.json", "w") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

data = get_pure_gyms()
output_to_file(data)
