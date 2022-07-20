from scrapy.item import Item
from scrapy.item import Field
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader

class Articulo(Item):
    titulo = Field()
    precio = Field()
    vendidos = Field()
    #descripcion = Field()

class MercadoLibreCrawler(CrawlSpider):
    name = 'mercadoLibre'
    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'CLOSESPIDER_PAGECOUNT': 50
    }
    download_delay = 1 

    allowed_domains = ['articulo.mercadolibre.com.co', 'listado.mercadolibre.com.co','mercadolibre.com.co','celulares.mercadolibre.com.co']   #Reducir espectro de búsqueda

    start_urls = ['https://celulares.mercadolibre.com.co/celulares']

    rules = (
        Rule(  # REGLA #1 => HORIZONTALIDAD POR PAGINACION
            LinkExtractor(
                allow=r'_Desde_'
            ), follow=True),
 
        Rule(   # REGLA #2 => VERTICALIDAD AL DETALLE PRODUCTOS
            LinkExtractor(
                allow=r'/MCO-'
            ), follow=True, callback='parse_items'),
    )

    def parse_items(self, response):
        item = ItemLoader(Articulo(), response)
 
        item.add_xpath('titulo', '//h1/text()')
        #item.add_xpath('descripcion', '//p[@class="ui-pdp-description__content"]/text()')
        item.add_xpath('precio', '//div[@class="ui-pdp-price__second-line"]//span[@class="andes-money-amount__fraction"]/text()')
        item.add_xpath('vendidos', '//span[@class="ui-pdp-subtitle"]/text()')
 
        yield item.load_item()