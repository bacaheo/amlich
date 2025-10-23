## amlich

[![build status](https://secure.travis-ci.org/vanng822/amlich.png)](http://travis-ci.org/vanng822/amlich)

Hồ Ngọc Đức Lunar Calendar (Am lich) running i Nodejs

Go to the link bellow for more detail
http://www.informatik.uni-leipzig.de/~duc/amlich/

## Documentation

Online documentation is available at: https://vanng822.github.io/amlich/

## Functions
### jdFromDate(dd, mm, yyyy)
Calculate Julian day number (the number of days between 1/1/4713 BC (Julian calendar) and dd/mm/yyyy)
### jdToDate(jd)
Convert a Julian day number to day/month/year
### convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone)
Convert a lunar date to the corresponding solar date
### convertSolar2Lunar(dd, mm, yyyy, timeZone)
Comvert solar date dd/mm/yyyy to the corresponding lunar date

## Publishing Documentation (For Maintainers)

To enable or update GitHub Pages for this repository:

1. Go to the repository's Settings on GitHub
2. Navigate to the "Pages" section in the left sidebar
3. Under "Source", select the branch you want to use (typically `master` or `main`)
4. Select `/docs` as the folder to publish from
5. Click "Save"

GitHub Pages will automatically publish the contents of the `docs/` folder to https://vanng822.github.io/amlich/

Any updates pushed to the `docs/` folder will be automatically deployed.