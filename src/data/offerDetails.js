// Long-form content for the offer detail pages, keyed by offer id.
// `extras` are offer-specific services added to the generic "included" list.
export const offerDetails = {
  santorini: {
    description: {
      de: 'Weiß getünchte Häuser, blaue Kuppeln und der berühmteste Sonnenuntergang der Ägäis: Auf Santorini wohnen Sie in einem kleinen Boutique-Hotel am Kraterrand. Tagsüber erkunden Sie Fira und Oia, baden an den schwarzen und roten Stränden und probieren Wein aus vulkanischem Boden.',
      ru: 'Белоснежные домики, голубые купола и самый знаменитый закат Эгейского моря: на Санторини вы живёте в небольшом бутик-отеле на краю кальдеры. Днём – прогулки по Фире и Ие, чёрные и красные пляжи и вино с вулканических виноградников.',
    },
    highlights: {
      de: [
        'Sonnenuntergang in Oia',
        'Bootstour zum Vulkan Nea Kameni',
        'Weinprobe auf einem Familienweingut',
        'Roter Strand bei Akrotiri',
      ],
      ru: [
        'Закат в Ие',
        'Прогулка на лодке к вулкану Неа-Камени',
        'Дегустация на семейной винодельне',
        'Красный пляж у Акротири',
      ],
    },
  },
  maldives: {
    description: {
      de: 'Ihre eigene Villa auf Stelzen, direkt über der türkisfarbenen Lagune: Auf den Malediven heißt Urlaub vor allem Ruhe. Vom Bett aus blicken Sie aufs Meer, das Hausriff ist nur ein paar Flossenschläge entfernt, und dank All Inclusive müssen Sie sich um nichts kümmern.',
      ru: 'Собственная вилла на сваях прямо над бирюзовой лагуной: отдых на Мальдивах – это прежде всего тишина. Вид на океан прямо с кровати, домашний риф в нескольких метрах, а «всё включено» избавляет от любых забот.',
    },
    highlights: {
      de: [
        'Wasservilla mit eigener Terrasse',
        'Schnorcheln am Hausriff',
        'Sonnenuntergangs-Fahrt mit dem Dhoni',
        'Wasserflugzeug-Transfer',
      ],
      ru: [
        'Вилла над водой с собственной террасой',
        'Снорклинг на домашнем рифе',
        'Закат на традиционной лодке дони',
        'Трансфер на гидросамолёте',
      ],
    },
    extras: { de: 'Wasserflugzeug-Transfer zum Resort', ru: 'Трансфер на гидросамолёте до курорта' },
  },
  bali: {
    description: {
      de: 'Bali verbindet Spiritualität, Natur und Strand. Sie starten in Ubud zwischen Reisterrassen und Tempeln und wechseln danach an die Küste. Eine Rundreise in eigenem Tempo – mit Fahrer, aber ohne Gruppenstress.',
      ru: 'Бали – это духовность, природа и пляжи в одном путешествии. Сначала Убуд среди рисовых террас и храмов, затем побережье. Маршрут в собственном темпе – с водителем, но без групповой суеты.',
    },
    highlights: {
      de: [
        'Reisterrassen von Tegallalang',
        'Wassertempel Ulun Danu Beratan',
        'Sonnenaufgang am Mount Batur',
        'Strandtage in Sanur',
      ],
      ru: [
        'Рисовые террасы Тегаллаланг',
        'Храм на воде Улун Дану Братан',
        'Рассвет на вулкане Батур',
        'Пляжные дни в Сануре',
      ],
    },
    extras: { de: 'Privater Fahrer für 2 Ausflugstage', ru: 'Личный водитель на 2 дня экскурсий' },
  },
  paris: {
    description: {
      de: 'Ein verlängertes Wochenende in der Stadt der Liebe: Eiffelturm, Louvre, Montmartre und Croissants zum Frühstück. Ihr Hotel liegt zentral, sodass Sie die wichtigsten Sehenswürdigkeiten bequem zu Fuß oder mit der Metro erreichen.',
      ru: 'Длинные выходные в городе любви: Эйфелева башня, Лувр, Монмартр и круассаны на завтрак. Отель в центре – главные достопримечательности в пешей доступности или в паре остановок метро.',
    },
    highlights: {
      de: [
        'Bootsfahrt auf der Seine',
        'Montmartre und Sacré-Cœur',
        'Louvre oder Musée d’Orsay',
        'Abendblick vom Trocadéro',
      ],
      ru: ['Прогулка на кораблике по Сене', 'Монмартр и Сакре-Кёр', 'Лувр или музей Орсе', 'Вечерний вид с Трокадеро'],
    },
  },
  thailand: {
    description: {
      de: 'Kalksteinfelsen, die aus smaragdgrünem Wasser ragen, und Longtail-Boote am Strand: Krabi ist der perfekte Ausgangspunkt zum Inselhüpfen in der Andamanensee. Zwei Wochen Sonne, Strand und thailändische Küche.',
      ru: 'Известняковые скалы над изумрудной водой и лодки-лонгтейлы у берега: Краби – идеальная база для путешествий по островам Андаманского моря. Две недели солнца, пляжей и тайской кухни.',
    },
    highlights: {
      de: ['Railay Beach mit dem Longtail-Boot', '4-Insel-Tour', 'Phi-Phi-Inseln', 'Thai-Kochkurs'],
      ru: ['Пляж Рейли на лодке-лонгтейле', 'Тур «4 острова»', 'Острова Пхи-Пхи', 'Мастер-класс тайской кухни'],
    },
  },
  rome: {
    description: {
      de: 'Kolosseum, Forum Romanum, Vatikan und die beste Pasta Ihres Lebens: Rom in vier Tagen ist intensiv und unvergesslich. Ihr Hotel liegt in der Altstadt, ideal für Spaziergänge zu Trevi-Brunnen und Pantheon.',
      ru: 'Колизей, Римский форум, Ватикан и лучшая паста в вашей жизни: четыре дня в Риме – насыщенно и незабываемо. Отель в историческом центре – удобно гулять к фонтану Треви и Пантеону.',
    },
    highlights: {
      de: ['Kolosseum ohne Warteschlange', 'Vatikanische Museen', 'Trevi-Brunnen bei Nacht', 'Abend in Trastevere'],
      ru: ['Колизей без очереди', 'Музеи Ватикана', 'Фонтан Треви ночью', 'Вечер в Трастевере'],
    },
  },
  alps: {
    description: {
      de: 'Lauterbrunnen liegt in einem der schönsten Täler der Schweiz, umgeben von steilen Felswänden und Wasserfällen. Von hier aus erreichen Sie Wengen, Mürren und die Jungfrauregion. Ideal für Wanderer und alle, die Bergluft lieben.',
      ru: 'Лаутербруннен – одна из самых красивых долин Швейцарии среди отвесных скал и водопадов. Отсюда легко добраться до Венгена, Мюррена и региона Юнгфрау. Идеально для любителей пеших прогулок и горного воздуха.',
    },
    highlights: {
      de: ['Staubbachfall', 'Trümmelbachfälle im Berg', 'Panoramafahrt nach Mürren', 'Wanderung über der Baumgrenze'],
      ru: [
        'Водопад Штауббах',
        'Водопады Трюммельбах внутри горы',
        'Панорамная поездка в Мюррен',
        'Прогулка выше границы леса',
      ],
    },
    extras: { de: 'Regionaler Bergbahn-Pass', ru: 'Региональный абонемент на горные подъёмники' },
  },
  tokyo: {
    description: {
      de: 'Tokio ist laut und leise zugleich: Neonlichter in Shinjuku, ruhige Schreine im Park, Sushi um sechs Uhr morgens. Acht Nächte geben Ihnen Zeit für die Stadt und einen Tagesausflug in die Umgebung.',
      ru: 'Токио одновременно шумный и тихий: неон Синдзюку, спокойные храмы в парках, суши в шесть утра. Восемь ночей – достаточно времени для города и однодневной поездки за его пределы.',
    },
    highlights: {
      de: ['Shibuya-Kreuzung', 'Senso-ji-Tempel in Asakusa', 'Tagesausflug zum Fuji', 'Streetfood in Shinjuku'],
      ru: ['Перекрёсток Сибуя', 'Храм Сэнсо-дзи в Асакусе', 'Поездка к горе Фудзи', 'Уличная еда в Синдзюку'],
    },
    extras: { de: 'Prepaid-Karte für den Nahverkehr', ru: 'Транспортная карта с балансом' },
  },
  dolomites: {
    description: {
      de: 'Der Pragser Wildsee mit seinen Holzbooten gehört zu den bekanntesten Postkartenmotiven der Alpen. Sie wohnen in einem familiengeführten Hotel in Südtirol mit Halbpension und genießen Wanderungen, Bergseen und Südtiroler Küche.',
      ru: 'Озеро Брайес с деревянными лодками – одна из самых известных открыток Альп. Вы живёте в семейном отеле Южного Тироля с полупансионом: прогулки, горные озёра и тирольская кухня.',
    },
    highlights: {
      de: ['Ruderboot auf dem Pragser Wildsee', 'Drei Zinnen', 'Almwanderung mit Hüttenrast', 'Südtiroler Abendessen'],
      ru: ['Лодка на озере Брайес', 'Три Зубца (Тре-Чиме)', 'Прогулка по альпийским лугам', 'Ужин в тирольском стиле'],
    },
  },
  dubai: {
    description: {
      de: 'Dubai ist eine Stadt der Superlative: das höchste Gebäude der Welt, riesige Malls und direkt daneben die Wüste. Kombinieren Sie Strandtage mit einer Wüstensafari und einem Abend auf dem Creek.',
      ru: 'Дубай – город превосходных степеней: самое высокое здание мира, огромные моллы и пустыня совсем рядом. Сочетайте пляжный отдых с сафари по пустыне и вечером на Дубай-Крик.',
    },
    highlights: {
      de: [
        'Aussichtsplattform des Burj Khalifa',
        'Wüstensafari mit Abendessen',
        'Altstadt und Gewürzsouk',
        'Strandtag in Jumeirah',
      ],
      ru: [
        'Смотровая площадка Бурдж-Халифа',
        'Сафари по пустыне с ужином',
        'Старый город и рынок специй',
        'Пляжный день в Джумейре',
      ],
    },
  },
  barcelona: {
    description: {
      de: 'Barcelona vereint Architektur, Strand und Lebensfreude. Nach der Sagrada Família und dem Park Güell geht es zum Baden an die Barceloneta, abends zu Tapas ins Gotische Viertel.',
      ru: 'Барселона – это архитектура, пляж и радость жизни. После Саграда Фамилия и парка Гуэль – купание на Барселонете, а вечером тапас в Готическом квартале.',
    },
    highlights: {
      de: ['Sagrada Família', 'Park Güell', 'Gotisches Viertel', 'Strand von Barceloneta'],
      ru: ['Саграда Фамилия', 'Парк Гуэль', 'Готический квартал', 'Пляж Барселонета'],
    },
  },
  venice: {
    description: {
      de: 'Kanäle statt Straßen, Gondeln statt Autos: Venedig ist einzigartig. Ihr Hotel liegt nahe dem Markusplatz. Verlieren Sie sich in den Gassen und besuchen Sie die bunten Inseln Murano und Burano.',
      ru: 'Каналы вместо улиц, гондолы вместо машин: Венеция уникальна. Отель недалеко от площади Сан-Марко. Теряйтесь в узких улочках и съездите на яркие острова Мурано и Бурано.',
    },
    highlights: {
      de: ['Markusplatz und Dogenpalast', 'Gondelfahrt', 'Bunte Häuser auf Burano', 'Glasbläserei auf Murano'],
      ru: ['Площадь Сан-Марко и Дворец дожей', 'Прогулка на гондоле', 'Яркие дома Бурано', 'Стеклодувы Мурано'],
    },
  },
  prague: {
    description: {
      de: 'Die Goldene Stadt ist eines der schönsten Städteziele Europas – und schnell erreicht. Spazieren Sie über die Karlsbrücke, hinauf zur Prager Burg und durch die Altstadt mit ihrer astronomischen Uhr.',
      ru: 'Золотая Прага – одно из самых красивых городских направлений Европы, и добраться сюда совсем просто. Прогулка по Карлову мосту, подъём к Пражскому Граду и Староместская площадь с астрономическими часами.',
    },
    highlights: {
      de: ['Karlsbrücke am Morgen', 'Prager Burg und Veitsdom', 'Astronomische Uhr', 'Bootsfahrt auf der Moldau'],
      ru: [
        'Карлов мост утром',
        'Пражский Град и собор Святого Вита',
        'Астрономические часы',
        'Прогулка на кораблике по Влтаве',
      ],
    },
  },
  norway: {
    description: {
      de: 'Der Geirangerfjord zählt zum UNESCO-Welterbe: steile Felswände, Wasserfälle und kleine Höfe hoch über dem Wasser. Sie erleben die Fjorde vom Schiff und auf Wanderungen an Land.',
      ru: 'Гейрангер-фьорд входит в список Всемирного наследия ЮНЕСКО: отвесные скалы, водопады и маленькие фермы высоко над водой. Вы увидите фьорды с борта корабля и на прогулках по берегу.',
    },
    highlights: {
      de: [
        'Wasserfall „Sieben Schwestern“',
        'Aussichtspunkt Dalsnibba',
        'Fjordfahrt Geiranger – Hellesylt',
        'Wanderung zum Hof Skageflå',
      ],
      ru: [
        'Водопад «Семь сестёр»',
        'Смотровая площадка Дальснибба',
        'Круиз Гейрангер – Хеллесюльт',
        'Прогулка к ферме Скагефло',
      ],
    },
    extras: { de: 'Fjordfahrt mit dem Schiff', ru: 'Круиз по фьорду' },
  },
  iceland: {
    description: {
      de: 'Island ist Natur pur: Schluchten, Gletscher, Geysire und mit etwas Glück Polarlichter. Mit dem Mietwagen fahren Sie die Südküste entlang, übernachten in gemütlichen Gästehäusern und erleben Landschaften wie von einem anderen Planeten.',
      ru: 'Исландия – это природа в чистом виде: каньоны, ледники, гейзеры и, если повезёт, северное сияние. На арендованной машине вы проедете по южному побережью и остановитесь в уютных гостевых домах.',
    },
    highlights: {
      de: [
        'Schlucht Fjaðrárgljúfur',
        'Golden Circle mit Geysir',
        'Gletscherlagune Jökulsárlón',
        'Polarlichter (saisonal)',
      ],
      ru: [
        'Каньон Фьядрарглюфур',
        'Золотое кольцо и гейзеры',
        'Ледниковая лагуна Йокульсаурлоун',
        'Северное сияние (по сезону)',
      ],
    },
    extras: { de: 'Mietwagen inkl. Vollkasko', ru: 'Аренда автомобиля с полной страховкой' },
  },
  newyork: {
    description: {
      de: 'Die Stadt, die niemals schläft: Times Square, Central Park, Brooklyn Bridge und Skyline-Blicke, die man nie vergisst. Ihr Hotel liegt in Manhattan, ideal für Entdeckungen zu Fuß.',
      ru: 'Город, который никогда не спит: Таймс-сквер, Центральный парк, Бруклинский мост и незабываемые виды на небоскрёбы. Отель на Манхэттене – удобно исследовать город пешком.',
    },
    highlights: {
      de: [
        'Central Park',
        'Spaziergang über die Brooklyn Bridge',
        'Aussicht vom Top of the Rock',
        'Fähre nach Staten Island',
      ],
      ru: ['Центральный парк', 'Прогулка по Бруклинскому мосту', 'Вид с Top of the Rock', 'Паром на Статен-Айленд'],
    },
  },
  roadtrip: {
    description: {
      de: 'Rote Felsen, endlose Highways und Nationalparks wie aus dem Bilderbuch: Auf diesem Roadtrip durch Utah und Arizona sind Sie mit dem Mietwagen unterwegs. Die Route und alle Unterkünfte sind vorab geplant.',
      ru: 'Красные скалы, бесконечные хайвеи и национальные парки как с открытки: этот роад-трип по Юте и Аризоне – на арендованной машине. Маршрут и все ночёвки спланированы заранее.',
    },
    highlights: {
      de: ['Arches National Park', 'Monument Valley', 'Grand Canyon', 'Horseshoe Bend'],
      ru: ['Национальный парк Арки', 'Долина монументов', 'Гранд-Каньон', 'Подкова (Horseshoe Bend)'],
    },
    extras: { de: 'Mietwagen inkl. Versicherung', ru: 'Аренда автомобиля со страховкой' },
  },
}
