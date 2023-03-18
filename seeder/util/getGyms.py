from bs4 import BeautifulSoup

import os
import requests
import json

pure_gym_base_url = "https://www.puregym.com"
pure_gym_gyms_url = "https://www.puregym.com/gyms/"

gym_group_gyms_url = "https://www.thegymgroup.com/find-a-gym/"
gym_group_base_url = "https://www.thegymgroup.com"

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
      name = format_str(gym.text)
      address = gym_soup.find("button", class_="gym-address__link")
      if address:
        split = address.text.split(" ")
        post_code = format_str(f"{split[-1]} {split[-2]}")
        address = format_str(" ".join(split[:-2]))
        print(f"Adding gym {name}, address: {address}, post_code: {post_code}")
        output.append({ name: name.strip(), "brand": "Pure", address: address.strip(), post_code: post_code.strip() })
      else:
        print(f"Skipping gym {gym.text} missing title and address..")
    return output

def get_gym_group():
  s = makeSoup(gym_group_gyms_url)
  gym_list = [x for x in s.find_all("a") if x.find("strong")]
  output = []
  for gym in gym_list:
    href = gym_group_base_url + gym["href"]
    name = format_str(gym.find("strong").text)
    gym_soup = makeSoup(href)
    address = [x for x in gym_soup.find_all("a") if "https://www.google.com/maps/search" in x["href"]]
    if len(address) > 0:
      split = address[0].text.split(" ")
      address = format_str(" ".join(split[:-2]))
      post_code = format_str(f"{split[-2]} {split[-1]}")
      name = format_str(name)
      print(f"Adding gym {name}, address: {address}, post_code: {post_code}")
      output.append({ name: name, "brand": "Pure", address: address, post_code: post_code })
  return output

def output_to_file(data):
  filename = os.path.join(os.getcwd(), "gyms.json")
  print(f"Outputting to file: {filename}")
  with open(filename, "a") as f:
    json.dump(data, f, indent=4)

def format_str(string):
  a = [x.replace("\n", "") for x in string.split(",") if x]
  return ",".join(a).strip()

def main():
  gym_group_data = get_gym_group()
  pure_gym_data = get_pure_gyms()

  data = pure_gym_data + gym_group_data
  output_to_file(data)

main()
