var xAxisAttr = 'Data.Health.Birth Rate',
circleSizeAttr = 'Data.Health.Birth Rate',
bankRegion = new Set(['South Asia', 'Europe & Central Asia', 'Middle East & North Africa', 'Sub-Saharan Africa', 'Latin America & Caribbean', 'East Asia & Pacific', 'North America']),
year = 1980,
color = d3.scaleOrdinal().domain(['South Asia', 'Europe & Central Asia', 'Middle East & North Africa', 'Sub-Saharan Africa', 'Latin America & Caribbean', 'East Asia & Pacific', 'North America'])
.range(d3.schemeCategory10),
processedData, filteredData, x, xx, svg, circleSizeDomain, size, simulation, deletedRegion, addedRegion, bankRegionOld,
tooltip, mouseover, mousemove, mouseout, playYearCounter, playThrough=0, recursiveCall=0;

const countryCodeJson = {
                         "Andorra": "ad",
                         "United Arab Emirates": "ae",
                         "Afghanistan": "af",
                         "Antigua and Barbuda": "ag",
                         "Anguilla": "ai",
                         "Albania": "al",
                         "Armenia": "am",
                         "Angola": "ao",
                         "Antarctica": "aq",
                         "Argentina": "ar",
                         "American Samoa": "as",
                         "Austria": "at",
                         "Australia": "au",
                         "Aruba": "aw",
                         "Åland Islands": "ax",
                         "Azerbaijan": "az",
                         "Bosnia and Herzegovina": "ba",
                         "Barbados": "bb",
                         "Bangladesh": "bd",
                         "Belgium": "be",
                         "Burkina Faso": "bf",
                         "Bulgaria": "bg",
                         "Bahrain": "bh",
                         "Burundi": "bi",
                         "Benin": "bj",
                         "Saint Barthélemy": "bl",
                         "Bermuda": "bm",
                         "Brunei": "bn",
                         "Bolivia": "bo",
                         "Caribbean Netherlands": "bq",
                         "Brazil": "br",
                         "Bahamas": "bs",
                         "Bhutan": "bt",
                         "Bouvet Island": "bv",
                         "Botswana": "bw",
                         "Belarus": "by",
                         "Belize": "bz",
                         "Canada": "ca",
                         "Cocos (Keeling) Islands": "cc",
                         "DR Congo": "cd",
                         "Central African Republic": "cf",
                         "Republic of the Congo": "cg",
                         "Switzerland": "ch",
                         "Côte d'Ivoire (Ivory Coast)": "ci",
                         "Cook Islands": "ck",
                         "Chile": "cl",
                         "Cameroon": "cm",
                         "China": "cn",
                         "Colombia": "co",
                         "Costa Rica": "cr",
                         "Cuba": "cu",
                         "Cape Verde": "cv",
                         "Curaçao": "cw",
                         "Christmas Island": "cx",
                         "Cyprus": "cy",
                         "Czechia": "cz",
                         "Germany": "de",
                         "Djibouti": "dj",
                         "Denmark": "dk",
                         "Dominica": "dm",
                         "Dominican Republic": "do",
                         "Algeria": "dz",
                         "Ecuador": "ec",
                         "Estonia": "ee",
                         "Egypt": "eg",
                         "Western Sahara": "eh",
                         "Eritrea": "er",
                         "Spain": "es",
                         "Ethiopia": "et",
                         "European Union": "eu",
                         "Finland": "fi",
                         "Fiji": "fj",
                         "Falkland Islands": "fk",
                         "Micronesia": "fm",
                         "Faroe Islands": "fo",
                         "France": "fr",
                         "Gabon": "ga",
                         "United Kingdom": "gb",
                         "England": "gb-eng",
                         "Northern Ireland": "gb-nir",
                         "Scotland": "gb-sct",
                         "Wales": "gb-wls",
                         "Grenada": "gd",
                         "Georgia": "us-ga",
                         "French Guiana": "gf",
                         "Guernsey": "gg",
                         "Ghana": "gh",
                         "Gibraltar": "gi",
                         "Greenland": "gl",
                         "Gambia": "gm",
                         "Guinea": "gn",
                         "Guadeloupe": "gp",
                         "Equatorial Guinea": "gq",
                         "Greece": "gr",
                         "South Georgia": "gs",
                         "Guatemala": "gt",
                         "Guam": "gu",
                         "Guinea-Bissau": "gw",
                         "Guyana": "gy",
                         "Hong Kong": "hk",
                         "Heard Island and McDonald Islands": "hm",
                         "Honduras": "hn",
                         "Croatia": "hr",
                         "Haiti": "ht",
                         "Hungary": "hu",
                         "Indonesia": "id",
                         "Ireland": "ie",
                         "Israel": "il",
                         "Isle of Man": "im",
                         "India": "in",
                         "British Indian Ocean Territory": "io",
                         "Iraq": "iq",
                         "Iran": "ir",
                         "Iceland": "is",
                         "Italy": "it",
                         "Jersey": "je",
                         "Jamaica": "jm",
                         "Jordan": "jo",
                         "Japan": "jp",
                         "Kenya": "ke",
                         "Kyrgyzstan": "kg",
                         "Cambodia": "kh",
                         "Kiribati": "ki",
                         "Comoros": "km",
                         "Saint Kitts and Nevis": "kn",
                         "North Korea": "kp",
                         "South Korea": "kr",
                         "Kuwait": "kw",
                         "Cayman Islands": "ky",
                         "Kazakhstan": "kz",
                         "Laos": "la",
                         "Lebanon": "lb",
                         "Saint Lucia": "lc",
                         "Liechtenstein": "li",
                         "Sri Lanka": "lk",
                         "Liberia": "lr",
                         "Lesotho": "ls",
                         "Lithuania": "lt",
                         "Luxembourg": "lu",
                         "Latvia": "lv",
                         "Libya": "ly",
                         "Morocco": "ma",
                         "Monaco": "mc",
                         "Moldova": "md",
                         "Montenegro": "me",
                         "Saint Martin": "mf",
                         "Madagascar": "mg",
                         "Marshall Islands": "mh",
                         "North Macedonia": "mk",
                         "Mali": "ml",
                         "Myanmar": "mm",
                         "Mongolia": "mn",
                         "Macau": "mo",
                         "Northern Mariana Islands": "mp",
                         "Martinique": "mq",
                         "Mauritania": "mr",
                         "Montserrat": "ms",
                         "Malta": "mt",
                         "Mauritius": "mu",
                         "Maldives": "mv",
                         "Malawi": "mw",
                         "Mexico": "mx",
                         "Malaysia": "my",
                         "Mozambique": "mz",
                         "Namibia": "na",
                         "New Caledonia": "nc",
                         "Niger": "ne",
                         "Norfolk Island": "nf",
                         "Nigeria": "ng",
                         "Nicaragua": "ni",
                         "Netherlands": "nl",
                         "Norway": "no",
                         "Nepal": "np",
                         "Nauru": "nr",
                         "Niue": "nu",
                         "New Zealand": "nz",
                         "Oman": "om",
                         "Panama": "pa",
                         "Peru": "pe",
                         "French Polynesia": "pf",
                         "Papua New Guinea": "pg",
                         "Philippines": "ph",
                         "Pakistan": "pk",
                         "Poland": "pl",
                         "Saint Pierre and Miquelon": "pm",
                         "Pitcairn Islands": "pn",
                         "Puerto Rico": "pr",
                         "Palestine": "ps",
                         "Portugal": "pt",
                         "Palau": "pw",
                         "Paraguay": "py",
                         "Qatar": "qa",
                         "Réunion": "re",
                         "Romania": "ro",
                         "Serbia": "rs",
                         "Russia": "ru",
                         "Rwanda": "rw",
                         "Saudi Arabia": "sa",
                         "Solomon Islands": "sb",
                         "Seychelles": "sc",
                         "Sudan": "sd",
                         "Sweden": "se",
                         "Singapore": "sg",
                         "Saint Helena, Ascension and Tristan da Cunha": "sh",
                         "Slovenia": "si",
                         "Svalbard and Jan Mayen": "sj",
                         "Slovakia": "sk",
                         "Sierra Leone": "sl",
                         "San Marino": "sm",
                         "Senegal": "sn",
                         "Somalia": "so",
                         "Suriname": "sr",
                         "South Sudan": "ss",
                         "São Tomé and Príncipe": "st",
                         "El Salvador": "sv",
                         "Sint Maarten": "sx",
                         "Syria": "sy",
                         "Eswatini (Swaziland)": "sz",
                         "Turks and Caicos Islands": "tc",
                         "Chad": "td",
                         "French Southern and Antarctic Lands": "tf",
                         "Togo": "tg",
                         "Thailand": "th",
                         "Tajikistan": "tj",
                         "Tokelau": "tk",
                         "Timor-Leste": "tl",
                         "Turkmenistan": "tm",
                         "Tunisia": "tn",
                         "Tonga": "to",
                         "Turkey": "tr",
                         "Trinidad and Tobago": "tt",
                         "Tuvalu": "tv",
                         "Taiwan": "tw",
                         "Tanzania": "tz",
                         "Ukraine": "ua",
                         "Uganda": "ug",
                         "United States Minor Outlying Islands": "um",
                         "United Nations": "un",
                         "United States": "us",
                         "Alaska": "us-ak",
                         "Alabama": "us-al",
                         "Arkansas": "us-ar",
                         "Arizona": "us-az",
                         "California": "us-ca",
                         "Colorado": "us-co",
                         "Connecticut": "us-ct",
                         "Delaware": "us-de",
                         "Florida": "us-fl",
                         "Hawaii": "us-hi",
                         "Iowa": "us-ia",
                         "Idaho": "us-id",
                         "Illinois": "us-il",
                         "Indiana": "us-in",
                         "Kansas": "us-ks",
                         "Kentucky": "us-ky",
                         "Louisiana": "us-la",
                         "Massachusetts": "us-ma",
                         "Maryland": "us-md",
                         "Maine": "us-me",
                         "Michigan": "us-mi",
                         "Minnesota": "us-mn",
                         "Missouri": "us-mo",
                         "Mississippi": "us-ms",
                         "Montana": "us-mt",
                         "North Carolina": "us-nc",
                         "North Dakota": "us-nd",
                         "Nebraska": "us-ne",
                         "New Hampshire": "us-nh",
                         "New Jersey": "us-nj",
                         "New Mexico": "us-nm",
                         "Nevada": "us-nv",
                         "New York": "us-ny",
                         "Ohio": "us-oh",
                         "Oklahoma": "us-ok",
                         "Oregon": "us-or",
                         "Pennsylvania": "us-pa",
                         "Rhode Island": "us-ri",
                         "South Carolina": "us-sc",
                         "South Dakota": "us-sd",
                         "Tennessee": "us-tn",
                         "Texas": "us-tx",
                         "Utah": "us-ut",
                         "Virginia": "us-va",
                         "Vermont": "us-vt",
                         "Washington": "us-wa",
                         "Wisconsin": "us-wi",
                         "West Virginia": "us-wv",
                         "Wyoming": "us-wy",
                         "Uruguay": "uy",
                         "Uzbekistan": "uz",
                         "Vatican City (Holy See)": "va",
                         "Saint Vincent and the Grenadines": "vc",
                         "Venezuela": "ve",
                         "British Virgin Islands": "vg",
                         "United States Virgin Islands": "vi",
                         "Vietnam": "vn",
                         "Vanuatu": "vu",
                         "Wallis and Futuna": "wf",
                         "Samoa": "ws",
                         "Kosovo": "xk",
                         "Yemen": "ye",
                         "Mayotte": "yt",
                         "South Africa": "za",
                         "Zambia": "zm",
                         "Zimbabwe": "zw"
                       };
const countryCodeMap = new Map(Object.entries(countryCodeJson));

document.addEventListener('DOMContentLoaded', function () {

    Promise.all([d3.csv('static/countries_regions.csv'), d3.csv('static/global_development.csv')])
        .then(function (values) {
            wrangleData(values[0], values[1]);
            });

    tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    mouseover = function(event, d) {
        var tmp = countryCodeMap.has(d.country)?countryCodeMap.get(d.country):countryCodeMap.get("Arizona");
        tooltip
            .style("left", event.x + "px")
            .style("top", event.y + "px")
         tooltip.transition().duration(50).style("opacity", 1);
         tooltip.html("Country: "+d.country+" <img src=https://flagcdn.com/16x12/"+tmp+".png> </br>"
            +"X-Pos: "+d.xPos+"<br/>"
            +"Size: "+d.radius*2+"<br/>")
        }

    mousemove = function(event) {
        tooltip
        .style("left", event.x + "px")
        .style("top", event.y + "px")
        }

    mouseout = function() {
         tooltip.transition().duration(50).style("opacity", 0);
        }

    xAxis = document.getElementById('xAxis');
    xAxis.addEventListener('change', function handleChange(event) {
        xAxisAttr = event.target.value;
        animateXaxis(animateSwarm);
    });

    circleSize = document.getElementById('circleSize');
    circleSize.addEventListener('change', function handleChange(event) {
        circleSizeAttr = event.target.value;
        animateSwarm();
    });

    selectYear = document.getElementById('selectYear');
    selectYear.addEventListener('change', function handleChange(event) {
        year = parseInt(event.target.value);
        animateSwarm();
    });

    var checkboxIDs = document.querySelectorAll('input[class=regionCheckbox]')
    checkboxIDs.forEach(e => {
    e.addEventListener('change', function handleChange(event) {
        if(bankRegion.has(event.target.value)) {
            bankRegion.delete(event.target.value);
            deletedRegion = event.target.value;
            animateXaxis(animateRemoveCounries);
        }
        else {
            bankRegionOld = new Set(bankRegion);
            bankRegion = bankRegion.add(event.target.value);
            addedRegion = event.target.value;
            animateXaxis(animateAddCounries);
        }
    });
    });
});

function setProcessedData(response) {
    processedData = response;
    drawBeeswarm();
}


async function wrangleData(countries_regions, global_development) {
    $.ajax({
                    url: '/processData',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ global_development, countries_regions }),
                    success: function(response) {
                        setProcessedData(JSON.parse(response));
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
}

function drawBeeswarm() {
    filteredData = processedData.filter(x => bankRegion.has(x['World bank region']))
    .map(x => ({"xPos": x[xAxisAttr], "radius": x[circleSizeAttr], "year": x['Year'], "wbr": x['World bank region'], "country": x['Country']}));

    svg = d3.select('#beeswarm')

    svg.selectAll("*").remove();

    x = d3.scaleLinear()
        .range([150, 1420])
        .domain(d3.extent(filteredData.map(x => x.xPos)))
    xx = svg.append("g")
         .attr("class", "xAxis")
         .attr("transform", "translate(0, 730)")
         .transition()
         .duration(1500)
         .call(d3.axisBottom(x))

    svg.append("text")
    .attr("class", "xAxisText")
    .attr("x", (1420-150)/2 + xAxisAttr.length*3)
    .attr("y", 770)
    .text(xAxisAttr)
    .style("font-size", "15px")
    .style('opacity', 0)
    .transition()
    .duration(1500)
    .style('opacity', 1)

    circleSizeDomain = d3.extent(filteredData.map(x => x.radius));
    size = d3.scaleSqrt().domain(circleSizeDomain).range([5, 30]);

    drawLegend();

//reference: https://www.chartfleau.com/tutorials/d3swarm
        simulation = d3.forceSimulation(filteredData.filter(x => x['year']==year))
            .force("x", d3.forceX((d) => {
                return x(d.xPos);
                }).strength(1))

            .force("y", d3.forceY((d) => {
                return 400;
                }).strength(1))

            .force("collide", d3.forceCollide((d) => {
                return size(d.radius)+2;
                }))
            .alphaDecay(0.2)
            .alpha(1)
            .on("end", function(){
                var tmp = svg.selectAll(".circles")
                    .data(filteredData.filter(x => x['year']==year));
                    tmp
                    .join("circle")
                    .attr("class", "circles")
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("fill", function(d) {return color(d.wbr);})
                    .attr("fill-opacity", 0.8)
                    .attr("cx", (d) => d.x)
                    .attr("cy", (d) => d.y)
                    .attr("r", function(d) {return size(d.radius);})
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseout", mouseout)
            });
}

function animateSwarm() {
    filteredData = processedData.filter(x => bankRegion.has(x['World bank region']))
    .map(x => ({"xPos": x[xAxisAttr], "radius": x[circleSizeAttr], "year": x['Year'], "wbr": x['World bank region'], "country": x['Country']}));

    circleSizeDomain = d3.extent(filteredData.map(x => x.radius));
    size = d3.scaleSqrt().domain(circleSizeDomain).range([5, 30]);

    drawLegend();

//reference: https://www.chartfleau.com/tutorials/d3swarm
    simulation = d3.forceSimulation(filteredData.filter(x => x['year']==year))
        .force("x", d3.forceX((d) => {
            return x(d.xPos);
            }).strength(1))

        .force("y", d3.forceY((d) => {
            return 400;
            }).strength(1))

        .force("collide", d3.forceCollide((d) => {
            return size(d.radius)+2;
            }))
        .alphaDecay(0.2)
        .alpha(1)
        .on("end", function(){
            var tmp = svg.selectAll(".circles")
                .data(filteredData.filter(x => x['year']==year));
                tmp
                .join("circle")
                .attr("class", "circles")
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseout", mouseout)
                .transition()
                .duration(1000)
                .delay(function(d,i){ return i * 100 })
                .attr("stroke", "black")
                .attr("stroke-width", "1px")
                .attr("fill", function(d) {return color(d.wbr);})
                .attr("fill-opacity", 0.8)
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y)
                .attr("r", function(d) {return size(d.radius);})
                .on("end", () => {
                if(playThrough == 1){
                    ++playYearCounter;
                    recursiveCall=1;
                    if(playYearCounter == targetCircleTransitionsCnt)
                            playYear();
                    }
                    })
        });
}

function animateXaxis(callBackFunc) {
    filteredData = processedData.filter(x => bankRegion.has(x['World bank region']))
    .map(x => ({"xPos": x[xAxisAttr], "radius": x[circleSizeAttr], "year": x['Year'], "wbr": x['World bank region'], "country": x['Country']}));

    x = d3.scaleLinear()
        .range([150, 1420])
        .domain(d3.extent(filteredData.map(x => x.xPos)))

    svg.selectAll(".xAxisText")
        .transition()
        .duration(1500)
        .style('opacity', 0)
        .on("end", function() {
            xx = svg.selectAll(".xAxis")
                 .attr("transform", "translate(0, 730)")
                 .transition()
                 .duration(1500)
                 .call(d3.axisBottom(x))
                 .on("end", function() {
                 svg.selectAll(".xAxisText")
                 .text(xAxisAttr)
                 .transition()
                 .duration(1500)
                 .style('opacity', 1)
                 .on("end", callBackFunc)
                 })
                 })
}

function animateRemoveCounries() {
    var tmp;
    if(deletedRegion!='All')
        tmp = svg.selectAll(".circles").filter(function(d, i) {return d['wbr']==deletedRegion;})
    else
        tmp = svg.selectAll(".circles")

    tmp
    .attr("class", "removedCircles")
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .remove()
    .on("end", () => animateSwarm())
}

function animateAddCounries() {
    filteredData = processedData.filter(x => bankRegion.has(x['World bank region']))
    .map(x => ({"xPos": x[xAxisAttr], "radius": x[circleSizeAttr], "year": x['Year'], "wbr": x['World bank region'], "country": x['Country']}));

    circleSizeDomain = d3.extent(filteredData.map(x => x.radius));
    size = d3.scaleSqrt().domain(circleSizeDomain).range([5, 30]);

    drawLegend();

    //reference: https://www.chartfleau.com/tutorials/d3swarm
        simulation = d3.forceSimulation(filteredData.filter(x => x['year']==year))
            .force("x", d3.forceX((d) => {
                return x(d.xPos);
                }).strength(1))

            .force("y", d3.forceY((d) => {
                return 400;
                }).strength(1))

            .force("collide", d3.forceCollide((d) => {
                return size(d.radius)+2;
                }))
            .alphaDecay(0.2)
            .alpha(1)
            .on("end", function(){
                    if(bankRegion.size == 1){
                    svg.selectAll(".circles")
                    .data(filteredData.filter(x => x['year']==year).filter(x => x['wbr']==addedRegion))
                    .join("circle")
                    .attr("class", "circles")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseout", mouseout)
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("fill", function(d) {return color(d.wbr);})
                    .attr("fill-opacity", 0.8)
                    .attr("cx", (d) => d.x)
                    .attr("cy", (d) => d.y)
                    .attr("r", 0)
                    .transition()
                    .duration(1000)
                    .delay(function(d,i){ return i * 100 })
                    .attr("r", function(d) {return size(d.radius)})
                    }
                else{
                    svg.selectAll(".circles")
                    .data(filteredData.filter(x => x['year']==year).filter(x => bankRegionOld.has(x['wbr'])))
                    .join("circle")
                    .transition()
                    .duration(1000)
                    .delay(function(d,i){ return i * 100 })
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("fill", function(d) {return color(d.wbr);})
                    .attr("fill-opacity", 0.8)
                    .attr("cx", (d) => d.x)
                    .attr("cy", (d) => d.y)
                    .attr("r", function(d) {return size(d.radius);})
                    .on("end", function() {
                    svg.selectAll(".newCircles")
                    .data(filteredData.filter(x => x['year']==year).filter(x => bankRegion.has(x['wbr']) && !bankRegionOld.has(x['wbr'])))
                    .join("circle")
                    .attr("class", "newCircles")
                    .attr("cx", (d) => d.x)
                    .attr("cy", (d) => d.y)
                    .attr("r", 0)
                    .attr("fill", function(d) {return color(d.wbr);})
                    .attr("fill-opacity", 0)
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .transition()
                    .duration(1000)
                    .delay(function(d,i){ return i * 100 })
                    .attr("r", function(d) {return size(d.radius)})
                    .attr("fill-opacity", 0.8)
                    .on("end", function() {
                    svg.selectAll(".newCircles")
                    .attr("class", "circles")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseout", mouseout)
                    })
                    })
                    }
                });
}

var expanded = false;
function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function playYear() {
    var curr = d3.select("#playYear").node().value;
    if(curr == 'Pause' && recursiveCall == 0)
    {
        d3.select("#playYear").node().value = 'Play';
        playThrough = 0;
    }
    else
    {
        if(year < 2013){
            d3.select("#playYear").node().value = 'Pause';
            playYearCounter = 0;
            targetCircleTransitionsCnt = filteredData.filter(x => x['year']==year).length;
            year++;
            d3.select('#selectYear').node().value = year;
            playThrough=1;
            animateSwarm();
        }
        else
        {
            d3.select("#playYear").node().value = 'Play';
            recursiveCall = 0;
        }
    }
}

function drawLegend() {
    svg.selectAll(".legend").remove();

    var maxSize = size(d3.max(filteredData.map(x => x.radius)));
    var minSize = size(d3.min(filteredData.map(x => x.radius)));

    svg.append("circle").attr("class", "legend").attr("cx",1400).attr("cy",35).attr("r", maxSize)
    .style("fill", "white")
    .attr("stroke", "black")
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)

    svg.append("line").attr("class", "legend")
    .attr("x1", 1400+maxSize)
    .attr("y1", 35)
    .attr("x2", 1400+maxSize+30)
    .attr("y2", 35)
    .attr("stroke", "black")
    .style('stroke-dasharray', ('2,2'))
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)

    svg.append('text').attr("class", "legend")
    .attr('x', 1400+maxSize+30)
    .attr('y', 35)
    .attr('text-anchor', 'right').attr('alignment-baseline', 'central')
    .attr('font-size', '12px')
    .text("Max Size: "+d3.max(filteredData.map(x => x.radius))*2)
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)

    svg.append("circle").attr("class", "legend").attr("cx",1400).attr("cy",35+maxSize-size((d3.max(filteredData.map(x => x.radius))+d3.min(filteredData.map(x => x.radius)))/2))
    .attr("r", size((d3.max(filteredData.map(x => x.radius))+d3.min(filteredData.map(x => x.radius)))/2))
    .style("fill", "white").attr("stroke", "black").style('stroke-dasharray', ('2,2'))
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)

    svg.append("circle").attr("class", "legend").attr("cx",1400).attr("cy",35+maxSize-minSize).attr("r", minSize)
    .style("fill", "white").attr("stroke", "black")
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)

    svg.append("line").attr("class", "legend")
    .attr("x1", 1400+minSize)
    .attr("y1", 35+maxSize-minSize)
    .attr("x2", 1400+maxSize+30)
    .attr("y2", 35+maxSize-minSize)
    .attr("stroke", "black")
    .style('stroke-dasharray', ('2,2'))
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)

    svg.append('text').attr("class", "legend")
    .attr('x', 1400+maxSize+30)
    .attr('y', 35+maxSize-minSize)
    .attr('text-anchor', 'right').attr('alignment-baseline', 'central')
    .attr('font-size', '12px')
    .text("Min Size: "+d3.min(filteredData.map(x => x.radius))*2)
    .style("opacity", 0)
    .transition().duration(1000)
    .style("opacity", 1)
}