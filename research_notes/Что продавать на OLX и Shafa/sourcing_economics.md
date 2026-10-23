# Экономика закупки для мелкого украинского реселлера (Temu / AliExpress / 1688 / украинский опт / секонд) — состояние на 23.10.2026

Методологическое замечание: в этой среде прямые загрузки страниц (WebFetch/curl) блокировались прокси (403 CONNECT / DNS) для всех украинских доменов, а лимит веб-поиска был исчерпан после ~30 запросов. Поэтому все факты ниже взяты из поисковых выдач/сниппетов (а не из полного текста статей). Там, где цифры из сниппетов противоречат друг другу, это указано. Расчёты «landed cost» в разделе «Inferences» — мои собственные вычисления на базе процитированных тарифов, а не данные источников.

## Ключевой вопрос 1. Temu в Украине (2026): сроки, минимальный заказ, бесплатная доставка, таможня, закон о НДС и его сроки, дробление заказов

### Takeaway
Temu доставляет в Украину бесплатно (стандартная доставка без минимальной суммы по FAQ украинского фан-сайта; сторонние сайты называют порог ~416–450 грн / ~10 USD) за 14–25 дней по официальной странице; действующий беспошлинный лимит — 150 € на одну посылку от одного отправителя одному получателю. Закон об отмене льготы по НДС для посылок до 150 € принят Радой 15.10.2026, подписан президентом 22.10.2026, но заработает не раньше 1 июля 2027 г. и только после отдельного решения Кабмина и правок в Таможенный кодекс (з/п №15460).

### Cited Findings
**Сроки и условия доставки Temu**
- Официальная страница Temu об отправке: бесплатная стандартная доставка/самовывоз для всех заказов в Украину, срок 14–25 дней — [Temu shipping-info](https://www.temu.com/ua/shipping-info.html) (страница temu.com заблокирована из этой среды; данные из сниппета поиска).
- FAQ фан-сайта «Temu Україна»: бесплатная стандартная доставка на все заказы без минимальной суммы; для экспресс-доставки порог 129 USD — [Temu Україна FAQ](https://xn--e1aoqg.xn--j1amh/faq/).
- Сторонние купонные сайты называют порог бесплатной доставки ~416–450 грн и сроки 14–30 / 15–27 дней / 2–4 недели / 3–5 недель (большинство страниц датированы 262–463 днями назад) — [kupony.com.ua](https://kupony.com.ua/temu-dostavka-v-ukrayinu/), [magazyny.com.ua](https://magazyny.com.ua/temu), [umet.shop](https://umet.shop/).
- Доставка Temu осуществляется в отделения и поштоматы Новой Почты — [ukrnews.live](https://ukrnews.live/life/advice/temu-v-ukraini-iak-pravylno-zamovliaty-tovary/).
- Обзор Temu vs AliExpress: у Temu есть минимальная сумма заказа ~10 USD; сроки в Украину оценены как 7–14 дней для Temu и 15–45 дней для AliExpress (оценки блога, не официальные) — [aliukraine.com.ua](https://aliukraine.com.ua/kitajski-magazini/temu-vs-aliexpress/).
- Отзывы покупателей: доставка иногда очень долгая «из-за таможенного оформления в Украине», жалобы на низкое качество и несоответствие размеров/описания — [megakupony.com.ua](https://www.megakupony.com.ua/bloh/vrazhennya-vid-pokupok-na-temu).
- Исследование Gradus (2026): главные преимущества маркетплейсов для украинцев — широкий выбор (прежде всего Rozetka и Temu) и выгодные цены — [marketer.ua](https://marketer.ua/ua/marketplaces-instead-of-brands-how-will-ukrainians-choose-products/).

**Действующие таможенные правила (до вступления нового закона)**
- По данным Гостаможслужбы, товары суммарной фактурной стоимостью до 150 € в одной отправке от одного отправителя одному получателю не облагаются таможенными платежами; лимит действует на посылку, а не на день/месяц. При превышении — ввозная пошлина 10% и НДС 20% только с части стоимости сверх 150 € — [sud.ua](https://sud.ua/uk/news/obshchestvo/354045-shoping-na-temu-i-aliexpress-kakie-tamozhennye-pravila-deystvuyut-v-2026-godu-i-skolko-pridetsya-zaplatit); [pidrahui.pro калькулятор](https://pidrahui.pro/kalkuliator/myto-posylky/); [taryfnyk.com](https://taryfnyk.com/blog/yak-rozmytnyty-posylku-z-za-kordonu/); [legalaid.gov.ua](https://legalaid.gov.ua/publikatsiyi/posylky-z-za-kordonu-koly-dovedetsya-platyty-podatok/).
- Льгота зависит от кода товара, который определяет таможня — [duflu.org.ua](https://duflu.org.ua/myto-na-posylky-z-za-kordonu-v-ukraini-iak-pratsiuiut-pravyla-u-2026-rotsi/).

**Закон об НДС на посылки до 150 €**
- 15 октября 2026 г. Рада окончательно приняла законопроект об обложении НДС посылок до 150 € — [epravda.com.ua](https://epravda.com.ua/finances/rada-ostatochno-uhvalila-zakonoproyekt-pro-opodatkuvannya-posilok-826591/); [suspilne.media](https://suspilne.media/1428115-posilki-z-za-kordonu-do-150-evro-opodatkuut-pdv-rada-uhvalila-zakon/); [jerelo.com.ua 15.10.2026](https://jerelo.com.ua/ekonomika/2026/10/15/rada-uhvalyla-zakon-pro-pdv-na-posylky-do-150-yevro-koly-pochnut-diyaty-novi-pravyla/).
- Законопроект №16051-1 (первое чтение 16.09.2026): НДС должны начислять и платить сами иностранные маркетплейсы (AliExpress, Temu, Shein, Amazon) или их посредники в Украине; новые правила — не ранее 1 июля 2027 г. — [jerelo.com.ua 17.09.2026](https://jerelo.com.ua/ekonomika/2026/09/17/pdv-na-posylky-do-%E2%82%AC150-shho-rada-spravdi-uhvalyla-i-chomu-temu-ta-aliexpress-shhe-ne-podorozhchaly/); [tsn.ua](https://tsn.ua/groshi/posylky-z-amazon-aliexpress-i-temu-budut-opodatkovuvatysia-rada-zrobyla-pershyy-krok-3169562.html).
- 22 октября 2026 г. президент подписал три закона, отменяющих льготу по НДС для коммерческих международных посылок до 150 €; НДС 20% с первого евро; для покупок до 150 € налог начисляет и платит платформа; освобождены некоммерческие посылки физлицо→физлицу до 45 € и отдельные товары для военных — [nikvesti.com](https://nikvesti.com/news/business/325408-posylky-150-bilshe-zvilniatymut-pdv-zelenskyi-pidpysav-zakon); [chas.news](https://chas.news/news/posilki-do-150-vtratyat-podatkovu-pilgu-zelenskii-pidpisav-zakoni-pro-onlain-pokupki); [ukrmedia.news](https://ukrmedia.news/economics/pdv-mizhnarodni-posylky-150-evro/).
- Минфин: правила вступят в силу не ранее июля 2027 г.; для фактического запуска нужно отдельное решение Кабмина; дополнительно Рада должна принять з/п №15460 с изменениями в Таможенный кодекс — [epravda.com.ua](https://epravda.com.ua/finances/rada-ostatochno-uhvalila-zakonoproyekt-pro-opodatkuvannya-posilok-826591/); [napensii.ua](https://napensii.ua/uk/news/503050-deshevyh-tovariv-bilshe-ne-bude-rada-uhvalyla-zakon-pro-pdv-yakyj-vidkladaly-dva-roky/).
- Источники расходятся: один сниппет утверждает, что порог 150 € «планируют сохранить», другой — что НДС будет с первого евро — [zaxid.net](https://zaxid.net/pdv_na_posilki_z_za_kordonu_shho_zminitsya_dlya_pokuptsiv_i_biznesu_n1645373) vs [portal.lviv.ua](https://portal.lviv.ua/news/2026/10/15/posylky-z-temu-ta-aliexpress-ukraintsiam-obkhodytymutsia-dorozhche-detali); [thepage.ua](https://thepage.ua/ua/news/podatok-na-posilki-z-temu-ta-aliexpress-koli-zapracyuye-pdv).
- Оценка для покупателей: посылки с Temu могут подорожать ~на 20% — [vn.20minut.ua](https://vn.20minut.ua/Podii/posilki-z-temu-mozhut-podorozhchati-dlya-vinnichan-na-20-koli-i-chomu-12010185.html).
- Контекст доходов бюджета от налогообложения посылок (ноябрь 2025) — [minfin.com.ua](https://minfin.com.ua/ua/2025/11/05/161821670/) (цифры из сниппета недоступны).

### Inferences
- До ≈ июля 2027 г. экономика «Temu → OLX» не меняется: 0% НДС/пошлины при заказе до 150 € за посылку. После запуска НДС 20% закладывается платформой в цену на этапе заказа — т.е. закупочная цена для реселлера вырастет ровно на 20% без возможности «дробить» посылки для ухода от налога (налог считается с первого евро на уровне платформы, а не на таможне).
- Правило дробления сейчас: лимит 150 € считается на одну посылку от одного отправителя одному получателю (Гостаможслужба), а не на день. Практически это означает: заказ на 300 € у Temu, уходящий двумя посылками, формально под лимитом, но объединение посылок одного продавца в одну отправку (Temu часто консолидирует) может превысить 150 €. Ни один из источников не описывает практику суммирования нескольких заказов в день — см. Gaps.
- Для реселлера скорость оборота 14–25 дней (официально) + 1–3 дня внутри Украины означает цикл закупки ~3–4 недели; сезонный товар (Хэллоуин/Новый год) нужно заказывать за 5–6 недель до пика.

### Gaps
- Не найдено ни одного документированного кейса, когда посылка Temu была остановлена/обложена таможней в Украине (поиск по «Temu затримала митниця» дал только статьи о правилах).
- Не найдено официальных данных Temu о пороге бесплатной доставки в гривнах на 2026 г. (расхождение: «без минимума» в FAQ vs 416–450 грн / ~10 USD на купонных сайтах).
- Не удалось проверить, суммирует ли таможня несколько посылок одного получателя в один день (источники не раскрывают).
- Полный текст закона (номер окончательного закона, точная формулировка про 150 € после 2027) не получен — страницы не открывались.

## Ключевой вопрос 2. Насколько дешевле 1688/AliExpress vs Temu при объёме 10–50 шт. и какие посредники везут в Украину

### Takeaway
Прямых ценовых сравнений по конкретным товарам (надувные костюмы, LED, павербанки, игрушки, зоотовары) в доступных источниках нет; общие обзоры дают разницу порядка ~10% в пользу Temu в рознице, но при штучном сравнении и для оптовых партий AliExpress/1688 часто дешевле. 1688 требует посредника: комиссия от 3% (мин. $30), доставка море от $1/кг (45–80 дней), ж/д $2,5–2,8/кг (35–45 дней), авиа $7,5–9/кг (15–25 дней), экспресс $12/кг (8–10 дней).

### Cited Findings
**Сравнение платформ**
- Один обзор оценивает общую разницу ~10% в пользу Temu, но отмечает, что AliExpress может быть дешевле при сравнении конкретных позиций, особенно для оптовых заказов — [forceget.com (2026)](https://forceget.com/blog/temu-vs-aliexpress-the-battle-of-ecommerce-giants/).
- Механика цен Temu — «торги» между поставщиками, платформа выбирает минимальную цену; на AliExpress продавцы устанавливают цены сами — [jingsourcing.com](https://jingsourcing.com/b-temu-vs-aliexpress/).
- Украинский обзор: утверждение о повсеместной дешевизне Temu «не совсем верно», смартфоны Realme/OnePlus/Poco и Mi Band дешевле на AliExpress — [andro-news.com](https://andro-news.com/ua/news/magazin-temu-konkurent-aliexpress-chi-kidalovo-minusi-ta-plyusi-.html).
- Temu имеет украинскую версию сайта; AliExpress — только русскую/английскую — [soloha.in.ua](https://soloha.in.ua/shho-krashhe-aliexpress-chy-temu-chesne-porivnyannya-kytajskyh-marketplejsiv/).
- Обзоры сходятся: Temu лучше реагирует на запросы клиентов, AliExpress — шире ассортимент — [molbuk.ua](https://molbuk.ua/news/361759-temu-chy-aliexpress-iak-zamovliaty-deshevi-tovary-z-kytau-ta-ne-otrymaty-rozcharuvannia.html).
- Видео-сравнение «что я заказал на TEMU и сколько это стоит на AliExpress и в Украине» (YouTube; содержимое не извлечено) — [YouTube](https://www.youtube.com/watch?v=ut2Y_YjzidI).

**Посредники 1688 и тарифы доставки в Украину (сайты самих компаний, не независимые источники)**
- OptMaster: выкуп с 1688 — комиссия от 3% (минимум $30) при выкупе по инвойсу; море от $1/кг (45–80 дней), ж/д от $2,5–2,8/кг (35–45 дней); 1688 сам не доставляет за пределы Китая, внутренняя доставка до склада посредника оплачивается отдельно — [optmaster.top](https://optmaster.top/nashi-poslugy/vykup-z-1688/).
- Pollux: море $1/кг, авиа $8/кг, экспресс $12/кг (8–10 дней) — [pollux.org.ua](https://www.pollux.org.ua/vykup-s-magazinov/vykup-i-dostavka-s-1688-v-ukrainu/).
- Koleso Logistics: авиа от $8/кг; хранение на складе $0,3–0,8/кг в зависимости от срока — [koleso-logistics.com](https://koleso-logistics.com/ua/dostavka-z-1688-v-ukrayinu/).
- UA Way Logistics: море от $1/кг, ж/д ~$2,5–2,8/кг, авиа ~$7,5–9/кг — [uawaylogistics.com](https://www.uawaylogistics.com/dostavka-tovariv-z-kitayu/dostavka-z-1688).
- Другие посредники: Portal Express (калькулятор 2026) — [portal-express.com.ua](https://portal-express.com.ua/shop/1688-com-optovi-pokupky); Smart Trek — [smarttrek.com.ua](https://smarttrek.com.ua/); частные посредники на OLX — [olx.ua «посредник 1688»](https://www.olx.ua/uk/uslugi/q-%D0%BF%D0%BE%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA-1688/); Meest China Academy (обучение бизнесу с Китаем в 2026) — [meest.cn](https://meest.cn/news/biznes-iz-kitayem-u-2026-roci-yak-rozpochati-z-meest-china-academy-ta-organizuvati-postachannya-v-ukrayinu/).
- Морской фрахт Китай→Украина 2026: от $1/кг для сборных грузов (LCL), от $2500 за 20-футовый контейнер (FCL), без портовых/топливных надбавок — [optmaster.top блог](https://optmaster.top/blog/stavky-morskogo-frakhta/).

**Формулы себестоимости импорта (для ФОП с официальным ввозом)**
- Таможенная стоимость = инвойс + доставка до Украины + страховка; пошлина от таможенной стоимости, НДС 20% от (таможенная стоимость + пошлина); плюс брокер, сертификация, склад — [proficargo.com.ua](https://www.proficargo.com.ua/novini/yak-pravylno-porahuvaty-sobivartist-tovaru-z-kytayu-v-ukrayinu-z-urahuvannyam-dostavky-ta-mytnyczi.html).
- Пример Diffreight: инвойс $10/шт × 1000 = $10 000, международная доставка $1500, далее + пошлина, НДС, комиссии, сертификаты ÷ количество — [diffreight.com](https://diffreight.com/blog/rozrakhunok-cziny-importnogo-tovaru).
- M3Cargo: фактическая себестоимость партии обычно выше плановой — закладывать запас на брак и проверку качества — [m3cargo.com](https://m3cargo.com/ua/blog/kak-rasschitat-sebestoimost-tovara-iz-kitaya-s-uchetom-dostavki-i-drugikh-uslug/).
- TLC Logistics: полная себестоимость должна позволять наценку минимум 150% — [tlc.com.ua](https://tlc.com.ua/ua/chim-torguvati-v-ukrayini/).
- Ощадбанк, советы новичкам по закупке в Китае — [oschadbank.ua](https://www.oschadbank.ua/blog/zakupovuyemo-tovary-z-kytayu-porady-pochatkivcyam).

### Inferences
- Пример landed cost (мой расчёт на основе процитированных тарифов): партия 30 LED-гирлянд по $1,2 на 1688 (итого $36), вес 6 кг. Комиссия посредника max(3%, $30) = $30; внутренняя доставка по Китаю ~$5 (оценка); авиа $8/кг × 6 = $48. Итого $119 ≈ $3,97/шт (~165 грн при курсе ~41,5 — курс не из источников). Доставка ж/д ($2,7/кг = $16) снизила бы до $87 ≈ $2,9/шт, но срок 35–45 дней. Вывод: при малых партиях (10–50 шт.) минимальная комиссия $30 и весовые тарифы «съедают» преимущество 1688, и Temu с бесплатной доставкой зачастую выходит не дороже; 1688 начинает выигрывать от ~$300–500 закупки или от 20–30 кг.
- Все эти тарифы посредников — для «серого» ввоза посылками до 150 € на физлицо либо карго; для официального импорта ФОП добавляются пошлина (обычно 5–10%) + НДС 20% + брокер, что для мелких объёмов нерентабельно.

### Gaps
- Нет ни одного источника с прямым сравнением цен Temu / AliExpress / 1688 на конкретные позиции (надувные костюмы, LED-гаджеты, павербанки, игрушки, зоотовары, одежда) для Украины; оптовые цены 1688 в сниппетах не найдены.
- Независимые (не корпоративные) тарифы посредников на 2026 г. не найдены; все цифры — с сайтов самих компаний.
- Условия ввоза карго-посредниками через Польшу и практика «разбивки» на физлиц не подтверждены источниками.

## Ключевой вопрос 3. Украинские оптовые источники (Барабашово, 7 км, опт-сайты, дропшиппинг, секонд) и уровни цен на сезонные товары

### Takeaway
Официальных прайсов «Барабашово» и «7 км» на 2026 г. нет; есть лишь разрозненные цены продавцов (кусачки для ногтей $0,38/шт при ящике 600 шт., колготки 194,7 грн/упаковка 168 шт., джинсы 385 грн, минимальный опт от 500–1100 грн). Оптовый секонд-микс в Украине — 45–50 грн/кг (Prom), 65–106 грн/кг (английский от 500 кг), импортные партии $2,70–2,75/кг от 3–5 т. Дропшиппинг-поставщики Landing/Vipshop в выдаче не найдены.

### Cited Findings
**Барабашово (Харьков)**
- Телеграф (11.12.2025): искусственные ёлки на Барабашово 1 000–5 000 грн; блогеры утверждают, что в супермаркетах ёлки значительно дороже, чем на рынке (розничные цены) — [telegraf.com.ua](https://news.telegraf.com.ua/ukr/obshhestvo/2025-12-11/5927807-elka-po-tsene-minimalki-skolko-stoit-novogodnee-derevo-na-barabashovo-v-kharkove).
- Каталог поставщиков Барабашово (ёлки, новогодние товары, дропшипперы) — [bigopt.com](https://bigopt.com/en/catalog/novogodnie-elki/); одежда оптом с Барабашово — [rainbow-clothes.com](https://www.rainbow-clothes.com/articles/zhenskaya-odezhda-optom-v-kharkove-barabashovo.html); раздел «На Барабашово» оптом — [prom.ua](https://prom.ua/ua/Na-barabashovo;wholesale.html).
- Оптовые онлайн-прайсы на новогодние шапки/костюмы с кратностью упаковки — [kancmir.com.ua](https://kancmir.com.ua/ua/novogodnie-tovari/shapki-novogodnie-kostyumy); праздничный декор оптом — [kancmaster.com.ua](https://kancmaster.com.ua/cat-tvorchist-ta-hobi/cat-tovari-dlya-svyata/cat-svyatkovi-prikrasi/cat-svyatkoti-decor/), [season-hoztorg.com.ua](https://season-hoztorg.com.ua/ua/novogodnyaya-produktsiya/aksessuary-i-ukrasheniya/igrushki-i-dekor/) (цены в сниппетах не раскрыты).

**7 километр (Одесса)**
- Июль 2026: на промтоварном рынке «7 километр» стартовал сезон летних скидок на обувь, одежду, товары для дома — для розничных и оптовых покупателей — [prichernomorie.com.ua 16.07.2026](https://prichernomorie.com.ua/odessa/news/trade/2026-07-16/247109.php); режим работы пн–чт 6:00–15:00, сб–вс 6:00–16:00, пятница выходной — [prichernomorie.com.ua 16.06.2026](https://prichernomorie.com.ua/odessa/news/trade/2026-06-16/246429.php).
- Примеры цен продавцов 7 км: кусачки для ногтей $0,38/шт при ящике 600 шт.; колготки женские 194,7 грн за упаковку 168 шт.; джинсы мужские 385 грн; минимальный мелкий опт от 1100 грн (стельки) — [optsklad7km.com.ua](https://optsklad7km.com.ua/uk/), [optom7km.net](https://optom7km.net/ua/), [7-km.od.ua](https://7-km.od.ua/), [marina7km.com.ua](https://marina7km.com.ua/).
- Описание рынка: от дешёвых китайских товаров до турецкой/европейской обуви — [namori.com.ua](https://namori.com.ua/ua/svc/ryinok-7-kilometr).

**Дропшиппинг и опт-площадки**
- Prom.ua: агрегированные страницы дропшиппинг-поставщиков; часть предлагает доступ по подписке от 58 грн/мес — [prom.ua дропшиппинг оптом](https://prom.ua/ua/Dropshipping-postavschiki;wholesale.html).
- BigOpt: пример разницы опт/дроп — оптовый порог от 500 грн, дроп-цена 1850 грн за набор 500 покерных фишек — [bigopt.com/wall](https://bigopt.com/ua/wall/2/).
- Telegram «ДРОПШИППІНГ УКРАЇНА» (посты ~2 лет давности, одежда/обувь, выгрузка на Prom) — [t.me/droperi](https://t.me/s/droperi?before=3076).
- Надувные костюмы на Prom (розница): детский костюм тираннозавра «от 466 грн/мес» (рассрочка), взрослый T-Rex 2 999 грн; на OLX — в основном прокат — [prom.ua](https://prom.ua/Kostyum-tirannozavra.html), [olx.ua прокат](https://www.olx.ua/uk/arenda-prokat/q-костюм-динозавра/).
- Павербанки 20 000 mAh в украинской рознице: Prom от 795 грн (HOCO J155) до 1 999 грн (Baseus Bipow 2), Ugreen PB536 4 069 грн; Rozetka: XO PB309 549 грн, HOCO J154A 1 495 грн; реальная отдача ~65% заявленной ёмкости — [prom.ua](https://prom.ua/ua/Paverbanki-na-20000-mah.html), [rozetka.com.ua](https://rozetka.com.ua/ua/section/poverbanki-20000-mah/producer=bez-brenda/), [24.cv.ua](https://24.cv.ua/korysne-yak-vybraty-paverbank-dlia-blekautu/).

**Секонд-хенд оптом**
- Prom: секонд микс 1–2 сорт из Европы 50 грн/кг; «Мікс 1 сорт» 45 грн/кг — [prom.ua секонд оптом](https://prom.ua/ua/Sekond-hend;wholesale.html).
- OLX: оптовый секонд от 10 кг, от 65 грн/кг (Англия); обувь «микс крем» 9,5 €/кг — [olx.ua](https://www.olx.ua/uk/moda-i-stil/q-%D1%81%D0%B5%D0%BA%D0%BE%D0%BD%D0%B4-%D1%85%D0%B5%D0%BD%D0%B4-%D0%BE%D0%BF%D1%82%D0%BE%D0%BC-%D0%BE%D1%82-5-%D0%BA%D0%B3/).
- Семекс: английский секонд 106 грн/кг от 500 кг (при 5 000 кг указано 1,85 — единица неясна, рядом €) — [semexua.com.ua](https://semexua.com.ua/ua/p1514620301-sekond-hend-original.html).
- British Mix: $2,75/кг (Бирмингем, от 3 000 кг), $2,70/кг (Лондон, от 5 000 кг) — [britishmix.ua прайс](https://britishmix.ua/second-hand-pricelist/).

### Inferences
- Для Shafa (брендовая б/у одежда) секонд-микс по 45–65 грн/кг при среднем весе вещи ~0,4–0,5 кг даёт закупку ~20–30 грн/единица; маржа зависит от доли «кремовых» брендов в мешке — цифры о выходе брендовых вещей в источниках отсутствуют.
- Оптовые рынки выигрывают у Temu по скорости (товар сегодня) и по отсутствию риска таможни, но по цене на мелкие китайские товары (гаджеты, аксессуары) они обычно перепродают тот же Китай с наценкой; источников с прямым сравнением «цена на 7 км vs Temu» не найдено.

### Gaps
- Нет прайсов Барабашово/7 км на 2026 г. по категориям (костюмы, декор, подарки, аксессуары электроники) — только единичные цены с сайтов продавцов без дат.
- Дропшиппинг-поставщики Landing и Vipshop в выдаче не найдены; условия и дроп-наценки не подтверждены.
- Не найдены определения сортов «крем/экстра» и их цены у украинских оптовиков секонда.

## Ключевой вопрос 4. Тарифы Новой Почты/Укрпочты 2026, наложенный платёж, процент выкупа, OLX Доставка vs своя отправка

### Takeaway
Нова Пошта с 13.04.2026: документы 70 грн по городу / 80 по Украине, посылка до 10 кг 135 грн (было 120), до 30 кг 200 грн (было 180); комиссия за наложенный платёж 2% + 20 грн (1% + 10 грн при NovaPay/приложении); объявленная ценность до 500 грн включена. Укрпошта с 01.04.2026: «Крошечный» 50/60 грн, «Малый» до 8 000 см³ 75–90 грн; наложка 2% + 15 грн. Невыкуп: НП говорит, что 97% посылок забирают за 5 дней; сервисы оценивают невыкуп 1,9–3% (bay.ua) до 10–30% (BlackPost).

### Cited Findings
**Нова Пошта**
- С 13 апреля 2026 г. НП повысила тарифы более чем на 10%: большая посылка до 30 кг 180→200 грн, средняя до 10 кг 120→135 грн — [biz.liga.net](https://biz.liga.net/ua/transport/news/nova-poshta-pidvyshchuie-taryfy-bilshe-nizh-na-10); базовые тарифы выросли на 10–20 грн — [calcify.cc](https://calcify.cc/delivery/ukrainian-services/nova-poshta-calculator).
- Документы: по городу 60→70 грн, по Украине 70→80 грн — [novyny.live](https://novyny.live/ekonomi/nova-poshta-zminit-tarifi-skilki-dovedetsia-platiti-za-dostavku-posilok-320162.html/amp); [thepage.ua](https://thepage.ua/ua/news/nova-poshta-pidvishuye-tarifi-na-dostavku-sho-zminitsya-z-13-kvitnya); [glavcom.ua](https://glavcom.ua/economics/business/nova-poshta-zminjuje-tsini-skilki-koshtuvatime-vidpraviti-posilku-z-13-kvitnja-1111913.html).
- Диапазон тарифов: от 70 грн по городу до 200 грн за большую посылку по Украине; объёмный вес = Д×Ш×В/4000; в тариф включены пакеты 0,5–4 кг и комиссия за объявленную ценность до 500 грн — [netfreedom.org.ua](https://netfreedom.org.ua/taryfy-novoi-poshty-tsiny-2026-ta-laifkhaky-dlia-ekonomii/).
- Наложенный платёж: 2% от суммы + 20 грн (минимум 20 грн); оплата картой NovaPay/через приложение — 1% + 10 грн; объявленная ценность до 500 грн не тарифицируется отдельно — [calcify.cc](https://calcify.cc/delivery/ukrainian-services/nova-poshta-calculator); [cpb.org.ua](https://cpb.org.ua/komisiia-novoi-poshty-za-nakladenyi-platizh-taryfy-ta-ekonomiia-u-2026/); [novoposhta.com](https://novoposhta.com/ua/articles/nalozhenii-platizh-novoyi-poshti-u-2026/); [finance.novyny.live](https://finance.novyny.live/posilki-z-pisliaplatoiu-novoiu-poshtoiu-umovi-ta-komisiyi-u-travni-325453.html).
- Лимиты: наличными до 399 999 грн за отправление; на карту NovaPay до 100 000 грн; на другие карты 29 999 грн — [novoposhta.com](https://novoposhta.com/ua/articles/nalozhenii-platizh-novoyi-poshti-u-2026/); [zemelka.ua](https://zemelka.ua/uk/peresylka-deneh-novoi-pochtoi-polnyi-hyd-po-usluham-novapay/).
- С 1 июня НП ввела ограничения по посылкам с послеоплатой (детали в сниппете не раскрыты) — [buh.ligazakon.net](https://buh.ligazakon.net/news/236719_z-1-chervnya-nova-poshta-vvela-obmezhennya-shchodo-posilok-z-pslyaoplatoyu--shcho-vdbuvatsya).
- Бесплатное хранение сокращено с 7 до 5 дней; по статистике НП 97% отправлений забирают в первые 5 дней; при 1 000 посылок/мес ~30 могут «зависнуть» в отделении — [speka.ua](https://speka.ua/news/nova-posta-skorotila-bezkostovne-zberigannya-yak-prodavcyam-ne-vtracati-grosi-p15ol5).

**Процент выкупа (невыкуп)**
- bay.ua: на выборке 10 190 отправлений за 18 мес невыкуп 1,9% в среднем; 3,0% при наложке vs 0,3% при предоплате — [bay.ua](https://bay.ua/).
- BlackPost: от 10 до 30% посылок наложенным платежом не забирают (методика не указана) — [blackpost.com.ua](https://blackpost.com.ua/).
- Невыкуп = двойная доставка за счёт продавца; упоминаются потери до 10% — [eurofest.org.ua](https://www.eurofest.org.ua/pislyaplata-nova-poshta-cze-shho-hovayetsya-za-prostoyu-poslugoyu/); общее описание механики послеоплаты — [vctr.media](https://vctr.media/ua/pislyaplata-yak-cze-praczyuye-i-shho-potribno-znati-pered-vikoristannyam-117171/).

**Укрпошта**
- С 1 апреля 2026 г. — первое повышение с 2024 г.; минимальные посылки +5 грн; часть приоритетных тарифов без изменений; скидка 5 грн за онлайн-оформление — [thepage.ua](https://thepage.ua/ua/news/novi-tarifi-ukrposhti-z-1-kvitnya-2026-yak-zminyatsya-cini-na-posilki); [tsn.ua](https://tsn.ua/groshi/v-ukrayini-zrosly-taryfy-na-posylky-ukrposhta-poiasnyla-prychyny-3053468.html); [kreschatic.kiev.ua](https://kreschatic.kiev.ua/ukrayina/2026/04/02/ukrposhta-pidvyshhuye-taryfy-na-posylky-vpershe-z-2024-roku-shho-zminylosya.html).
- Тарификация по объёму: «Крошечный» Базовый 50 грн / Приоритетный 60 грн; «Малый» (до 8 000 см³) 75–80 / 85–90 грн; адресная доставка +45 грн; хранение сверх срока 10 грн/день; возврат отправителю 10 грн (базовый) / 20 грн (приоритетный) — [fakty.com.ua](https://fakty.com.ua/ua/ukraine/20260415-ukrposhta-taryfy-ta-onovlennya-czin-na-poslugy-dostavky/); [vidpravmo.com.ua](https://vidpravmo.com.ua/uk/porivnyannya/np-vs-ukrposhta/); [engage.org.ua](https://engage.org.ua/skilky-koshtuie-dostavka-ukrposhtoiu-u-2026-rotsi/).
- Наложенный платёж Укрпошта: 2% + 15 грн с НДС; доступен до 50 000 грн — [ukrposhta.ua тарифы на платежи](https://www.ukrposhta.ua/ua/taryfy-platezhi). Официальный PDF тарифов с пометкой «с 01.10.2026» — [ukrposhta.ua PDF](https://www.ukrposhta.ua/doc/kutochok-spozhyvacha/taryfy_ukrposhty_na_2026_rik.pdf) (содержимое не извлечено; новостей о повышении с 1 октября не найдено).
- Сравнение «где выгоднее отправлять по Украине 2026» — [dengi.ua](https://dengi.ua/ua/tarif/9760754-tarifi-na-dostavku-posilok-2026-de-vigidnishe-vidpravlyati-po-ukrayini).

**OLX Доставка и Shafa**
- OLX Доставка: деньги покупателя удерживаются на транзитном счёте и перечисляются продавцу после получения товара; комиссия взимается только при успешной сделке; при наложке/предоплате вне платформы комиссии нет — [netfreedom.org.ua](https://netfreedom.org.ua/?p=3612); [visnyk-nanu.org.ua](https://visnyk-nanu.org.ua/olx-dostavka-shho-cze-oznachaye-ta-yak-praczyuye-u-2026-roczi/).
- Размер комиссии OLX для продавца — источники расходятся: 1% + 10 грн (обзор) vs жалоба продавца, что показанные 2% + 20 грн при отправке Новой Почтой превратились в 2% + 35 грн — [plandiy.com.ua](https://plandiy.com.ua/?p=12461); [vidhuk.ua](https://www.vidhuk.ua/olx/review-2201986); OLX о введении комиссии — [kosht.media](https://kosht.media/olx-zaprovadzhuie-komisiiu-dlia-prodavtsiv-khto-i-skilky-zaplatyt/); [finance.ua](https://news.finance.ua/ua/olx-bratyme-komisiyu-za-uspishni-prodazhi).
- С 1 июня 2025 г. OLX в бета-режиме менял размер «Безопасной сделки» и комиссии для части пользователей, выбирающих НП с оплатой в отделении; покупатель платит также комиссию UAPAY (0,5–2% + фикс); обратная доставка при отказе бесплатна — [netfreedom.org.ua](https://netfreedom.org.ua/?p=3612).
- Жалоба: продал книгу за 36 грн через OLX-доставку — получил 0 грн (комиссии съели всё) — [vidhuk.ua](https://www.vidhuk.ua/olx/review-2334828).
- Shafa: доставка в точки выдачи Rozetka — 30 грн за счёт продавца, хранение 10 дней, до 15 кг / 120 см — [kosht.media](https://kosht.media/dostavka-shafa-do-tochky-vydachi-rozetka-iak-zamovyty/); [forbes.ua 2023](https://forbes.ua/news/u-tochki-vidachi-rozetka-dostavlyatimut-tovari-iz-marketpleysu-shafa-de-torguyut-vzhivanimi-brendovanimi-rechami-26102023-16923); отзыв продавца 30.01.2026: после оплаты 35 грн отправки и удержания комиссии осталось ~20 грн — [vidhuk.ua](https://www.vidhuk.ua/shafa-shafaua/review-1731815); упоминание удержания 2% (2025) — [vidhuk.ua](https://www.vidhuk.ua/shafa-shafaua/review-2107945).

### Inferences
- Пример полной экономики одной продажи (мой расчёт по процитированным тарифам): товар с Temu за 250 грн (landed, доставка бесплатна), продаётся на OLX за 600 грн наложкой через НП. Доставка до 2 кг — ориентир ~100–110 грн (точный тариф до 2 кг в источниках не найден; известны 80 грн документы и 135 грн до 10 кг); если доставку платит покупатель, продавец несёт только комиссию наложки 2%×600+20 = 32 грн (или 1%+10 = 16 грн через NovaPay) и комиссию OLX (если сделка через OLX Доставку, ~2%+20…35 грн = 32–47 грн). Чистая маржа ≈ 600 − 250 − 32 − ~40 = ~278 грн (46%). При невыкупе 3% (bay.ua) ожидаемая потеря на 100 отправок = 3 × (двойная доставка ~200–270 грн) ≈ 600–800 грн, т.е. ~6–8 грн на заказ; при невыкупе 10–30% (BlackPost) — 20–80 грн на заказ, что критично для товаров с маржой < 100 грн.
- Отсюда минимальная наценка: для дешёвых товаров (landed < 150 грн) наценка должна быть не менее 2,5–3× (150%+, как советует TLC), чтобы покрыть комиссии 50–80 грн на сделку и невыкуп; для товаров 500+ грн достаточно 60–100%.
- OLX Доставка снимает риск невыкупа (покупатель платит вперёд на транзитный счёт, возврат бесплатен для него), но добавляет комиссию; для дешёвых вещей (< 100 грн) комиссии могут обнулить выручку (кейс с книгой за 36 грн).

### Gaps
- Не найден официальный тариф НП на посылку до 2 кг и на поштоматы 2026 (только документы, 10 кг, 30 кг).
- Официальная статистика НП по проценту невыкупа при наложке отсутствует; данные bay.ua и BlackPost противоречат друг другу на порядок.
- Актуальная официальная таблица комиссий OLX Доставки и Shafa на 2026 г. не найдена (только обзоры и жалобы).
- Содержимое PDF Укрпошты «с 01.10.2026» не извлечено.

## Ключевой вопрос 5. Налоги реселлера 2026: ФОП 2/3 группа, «налог на OLX», и что из Temu/Китая реально выгодно перепродавать

### Takeaway
ФОП 2 группа 2026: лимит дохода 7 211 598 грн (834 МЗП × 8 647 грн), ЕН до 1 729,40 грн/мес + военный сбор 864,70 грн/мес + ЕСВ 1 902,34 грн/мес; 3 группа: лимит 10 091 049 грн, 5% (или 3% + НДС) + 1% ВС. Закон 15111-д («налог на OLX») принят и подписан: платформы станут налоговыми агентами и будут удерживать 10% (5% ПДФО + 5% ВС) с регулярных продаж физлиц; порог необлагаемого дохода называют 2 000 €/год; вступает не ранее января 2027 г. (обмен данными — ближе к 2028). Конкретных задокументированных списков «прибыльных/убыточных Temu-товаров» от украинских реселлеров в доступных источниках не найдено.

### Cited Findings
**ФОП 2026**
- 2 группа: лимит 7 211 598 грн (834 × МЗП 8 647 грн), до 10 наёмных работников; ЕН до 1 729,40 грн/мес; военный сбор 864,70 грн/мес; ЕСВ 1 902,34 грн/мес — [taxer.ua](https://taxer.ua/uk/kb/limity-dokhodu-fop-2026); [oschadbank.ua](https://www.oschadbank.ua/blog/fop-2026-limiti-dohodu-ta-podatkove-navantazenna); [bip.net.ua](https://bip.net.ua/articles/fop-2-grupa-limiti-podatki-vidi-zvitnosti-shtrafi-kalendar-zvitnosti-na-rik/); [7eminar.ua](https://7eminar.ua/news/12350-jedinii-podatok-2026-yaku-grupu-obrati-fopu-limiti-stroki-splati).
- 3 группа: лимит 10 091 049 грн (1 167 МЗП); 5% дохода без НДС или 3% с НДС; военный сбор 1% дохода; без ограничения по работникам — [elma-consulting.ua](https://elma-consulting.ua/blog/limit-fop/); [irengroop.com.ua](https://irengroop.com.ua/grupy-fop); [monefy.ua](https://monefy.ua/blog/iedynyj-podatok/).
- При превышении лимита — 15% с суммы превышения и переход на следующую группу/общую систему — [taxer.ua блог](https://taxer.ua/uk/blog/212).

**«Налог на OLX» (закон 15111-д о цифровых платформах)**
- Рада приняла закон 15111-д; платформы автоматически становятся налоговыми агентами и удерживают 10% ПДФО, если доход регулярный и выше порога; по тексту вступает не ранее января 2027 г.; наладка обмена данными между платформами и налоговой — ближе к 2028 г. — [rbc.ua](https://www.rbc.ua/rus/news/podatkova-znatime-prodazhi-olx-rada-uhvalila-1781002171.html); [unian.ua](https://www.unian.ua/economics/finance/podatok-na-olx-rada-priynyala-skkandalniy-zakon-13406724.html).
- Ставка 10% = 5% ПДФО + 5% военный сбор (ранее совокупно 23%); ФОПы работают как раньше по своим ставкам — [finance.ua](https://news.finance.ua/ua/podatok-na-olx-uhvaleno-skil-ky-teper-styahuvatymut-iz-onlayn-prodazhiv-ta-koho-ce-omyne); [mc.today](https://mc.today/uk/podatok-na-olx-ne-te-chim-zdayetsya-shho-naspravdi-zminyuye-novij-zakon-dlya-prodavtsiv-i-frilanseriv-na-platformah/).
- Порог: доход от продажи товаров через платформы до 2 000 €/год не облагается; льготная ставка 10% действует в пределах 834 МЗП/год — [glavred.net](https://glavred.net/economics/rada-prinyala-zakon-o-naloge-na-olx-k-chemu-teper-sleduet-gotovitsya-ukraincam-10771556.html); [nashreporter.com](https://nashreporter.com/suspilstvo/verhovna-rada-pidtrymala-podatok-na-olx-kogo-torknutsya-novi-pravyla-onlajn-prodazhiv-313967).
- Правило «с первых 3 продаж б/у вещей удержат 10%» упоминалось только в правительственном проекте 2025 г.; в итоговом законе по сниппетам не подтверждено — [rbc.ua 2025](https://www.rbc.ua/rus/news/podatok-prodavtsiv-olx-rozetka-i-prom-radi-1745948072.html).
- 22–23.10.2026 президент подписал законы о налогах для продавцов OLX, водителей такси и посылок из Temu — [prorivne.rv.ua](https://www.prorivne.rv.ua/news/zelenskyj-pidpysav-zakony-pro-podatky-dlya-olx-prodavcziv-vodiyiv-taksi-ta-posylok-iz-temu/); [znaj.org](https://znaj.org/zelenskyj-pidpysav-podatok-na-olx-hto-i-skilky-platytyme-z-2027-roku/).

**Что выгодно/невыгодно перепродавать из Temu/Китая**
- Региональный (рекламный) материал утверждает, что «многие продавцы на OLX перепродают с Temu с прибылью» — без цифр — [048.ua](https://www.048.ua/list/313741).
- Комментарий читателя под статьёй Минфина: прямые заказы с китайских маркетплейсов — «реальная проблема для перекупов», т.к. люди могут заказывать напрямую — [minfin.com.ua](https://minfin.com.ua/ua/2025/11/05/161821670/).
- Forbes (2024): трафик Temu в Украине вырос за весну 2024 более чем в 10 раз до 9,96 млн посетителей — почти как AliExpress, втрое меньше Rozetka — [forbes.ua](https://forbes.ua/company/vbivtsya-aliexpress-marketpleys-temu-nazdognav-kitayskogo-konkurenta-za-trafikom-v-ukraini-chi-zabere-vin-chastku-u-rozetka-25062024-21827).
- Horoshop: Prom и Rozetka — главные площадки с «бешеной конкуренцией» — [horoshop.ua](https://horoshop.ua/ua/blog/top-10-marketplaces-of-ukraine/).
- Allegro (Польша) стал доступен в Украине как альтернатива Temu — [24tv.ua](https://24tv.ua/business/ru/allegro-teper-dostupen-v-ukraine-chto-mozhno-kupit-na-marketplejse-pohozhem-na-temu_n3161677).
- Розничные цены на павербанки у украинских импортёров (XO PB309 — 549 грн на Rozetka; HOCO 795 грн на Prom) — [24.cv.ua](https://24.cv.ua/korysne-yak-vybraty-paverbank-dlia-blekautu/); [prom.ua](https://prom.ua/ua/Paverbanki-na-20000-mah.html).
- Советы покупателям Temu/AliExpress: заказывать дешёвые товары с Китая без разочарований (качество, размеры) — [molbuk.ua](https://molbuk.ua/news/361759-temu-chy-aliexpress-iak-zamovliaty-deshevi-tovary-z-kytau-ta-ne-otrymaty-rozcharuvannia.html).

### Inferences
- Налоговая развилка для реселлера с оборотом до ~7,2 млн грн/год: ФОП 2 группа — фиксированно ~4 496 грн/мес (ЕН 1 729,40 + ВС 864,70 + ЕСВ 1 902,34) независимо от оборота; при обороте 50 000 грн/мес это ~9%, при 150 000 грн/мес — ~3%. Физлицо без ФОП с 2027 г. — 10% с продаж через платформы сверх ~2 000 €/год, удерживаемых платформой (OLX/Prom/Shafa), но без ЕСВ. Для оборота < 2 000 €/год физлицу выгоднее оставаться без ФОП; выше ~100–150 тыс. грн/мес — ФОП 2 гр.
- Категории с подтверждённым ценовым давлением со стороны украинских импортёров: павербанки (Rozetka продаёт «честные» 20 000 mAh за 549 грн — у Temu аналогичный no-name с учётом ~65% реальной ёмкости вряд ли даст маржу после доставки и возвратов), смартфоны/Mi Band (дешевле на AliExpress, чем на Temu). Это косвенный вывод: массовые электронные товары уже завозятся контейнерами и продаются на Rozetka/Prom по ценам, близким к Temu-розничным.
- Категории, где логически остаётся маржа (не подтверждено прямыми источниками — см. Gaps): нишевые/сезонные позиции с низкой конкуренцией на Prom (надувные костюмы — на Prom 2 999 грн розница, на OLX в основном прокат; редкие игрушки, зоотовары с нестандартным дизайном), где покупатель не готов ждать 3–5 недель и хочет «сегодня» через НП. Risk: возвраты по качеству/размеру (одежда).
- После июля 2027 г. (+20% НДС на платформе) и с 2027 г. (10% с платформ) совокупная нагрузка на «физлицо, перепродающее Temu на OLX» вырастет примерно на 30 п.п. к текущей — многие низкомаржинальные категории (аксессуары < 200 грн) перестанут окупаться.

### Gaps
- Не найдено ни одного украинского источника (блог продавца, Telegram, YouTube с транскриптом), который бы перечислял конкретные Temu-товары, оказавшиеся прибыльными или убыточными при перепродаже на OLX/Prom; все выдачи — рекламные или потребительские обзоры.
- Точные параметры закона 15111-д (порог 2 000 € vs 12 МЗП, число продаж, применение к б/у вещам, дата вступления) не проверены по тексту закона — страницы не открывались, сниппеты расходятся.
- Нет данных о ценах Temu на конкретные товарные группы (LED, игрушки, зоотовары, костюмы) в гривнах на октябрь 2026 — temu.com заблокирован из среды.
- Текущий курс грн/USD/EUR для пересчёта landed cost в источниках не зафиксирован; расчёты в Inferences используют ориентировочный курс и помечены как собственные.
