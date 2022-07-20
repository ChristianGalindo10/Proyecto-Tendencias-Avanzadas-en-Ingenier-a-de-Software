from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pandas as pd
import time

from flask import Flask, render_template, request
from nltk.util import pr
import forms
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

my_json = {"products": []}


def getInfo(query):
    global my_json
    my_json["products"].clear()
    driver =  webdriver.Chrome("./chromedriver")
    driver.get("https://www.mercadolibre.com.co/")
    search_bar = driver.find_element(By.CLASS_NAME,"nav-search-input")
    search_bar.clear()
    search_bar.send_keys(query)
    search_bar.send_keys(Keys.RETURN)

    pagination = driver.find_element(By.XPATH,"//li[@class='andes-pagination__page-count']").text
    pagination = [ int(s) for s in pagination.split() if s.isdigit()][0]

    records = []
    
    #for _product in range(1,pagination+1):
    for _product in range(1,2+1):
        if _product != pagination:
            next_page_button = driver.find_element(By.CSS_SELECTOR,"a[title='Siguiente']")

        title_products = driver.find_elements(By.XPATH,"//h2[@class='ui-search-item__title']")
        title_products = [     title.text  for title in title_products            ]


        price_products = driver.find_elements(By.XPATH,"//li[@class='ui-search-layout__item']//div[@class='ui-search-result__content-columns']//div[@class='ui-search-result__content-column ui-search-result__content-column--left']/div[1]/div//div[@class='ui-search-price__second-line']//span[@class='price-tag-amount']//span[2]")
        price_products = [ price.text for price in price_products   ]


        links_products = driver.find_elements(By.XPATH,"//div[@class='ui-search-item__group ui-search-item__group--title']//a[1]")
        links_products = [ link.get_attribute("href") for link in links_products   ]


        data_products = {

            "name_product":title_products,
            "price_product":price_products,
            "link_product":links_products

        }
        my_json["products"].append(data_products)

        df =  pd.DataFrame(data_products)
        records.append(df)
        if _product != pagination:
            driver.execute_script("arguments[0].click()", next_page_button)

    df = pd.concat(records)
    df.to_csv("PRODUCTOS.csv")
    time.sleep(4)
    driver.close()
    return my_json

@app.route('/')
def index():
    keyword_form = forms.KeywordForm()
    return render_template('index.html', form=keyword_form)

@app.route('/results_template')
def tweets_template():
    return render_template('results.html')

@app.route('/del', methods=['GET', 'POST'])
def delete():
    keyword_form = forms.KeywordForm()
    return render_template('index.html', form=keyword_form)

@app.route('/get', methods=['GET', 'POST'])
def get():
    query = request.args.get('query')
    info = getInfo(query)
    return info

if __name__ == '__main__':
    app.run()


