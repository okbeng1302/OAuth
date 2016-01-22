# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MagazineCover(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    pubDate = scrapy.Field()
    file_urls = scrapy.Field()
    files = scrapy.Field()


class LessonInfo(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    lesson = scrapy.Field()
    unit = scrapy.Field()
    time = scrapy.Field()
    file_urls = scrapy.Field()
    files = scrapy.Field()