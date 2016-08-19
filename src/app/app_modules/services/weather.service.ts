import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ServiceWorkerService} from './service-worker.service';

class WeatherResult {
    public location: string;
    public humidity: number;
    public pressure: number;
    public sunrise: string;
    public sunset: string;
    public temp: number;
    public date: Date;
    public windSpeed: number;
    public windTemp: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}


const fahrenheitToCelsius = function (val: number) {
    return Math.floor((val - 32) / 0.18) / 10;
};

const mphToKmh = function (val: number) {
    return Math.floor(val * 160.9344) / 100;
};

const toLength = function (val: number, length = 2) {
    let str = val.toString();
    return new Array(Math.max(length - str.length + 1, 1)).join('0') + str;
};

const formatDate = function (date: Date) {
    return `${
        toLength(date.getDate())
        }/${
        toLength(date.getMonth() + 1)
        }/${
        toLength(date.getFullYear(), 4)
        } ${
        toLength(date.getHours())
        }:${
        toLength(date.getMinutes())
        }`;
};


@Injectable()
export class WeatherService {

    static getUrl(place: string) {
        return `https://query.yahooapis.com/v1/public/yql\
?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) \
where text='${place}')&format=json`;
    }

    constructor(private http: Http,
                private serviceWorker: ServiceWorkerService) {
    }

    getForecast(place: string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(WeatherService.getUrl(place))
                .map(res => res.json())
                .subscribe(resp => {
                    if (resp && resp.query && resp.query.count) {

                        let channel = resp.query.results.channel;

                        let result: WeatherResult = new WeatherResult({
                            location  : `${channel.location.city} ${channel.location.country}`,
                            humidity  : parseFloat(channel.atmosphere.humidity),
                            pressure  : parseFloat(channel.atmosphere.pressure),
                            sunrise   : channel.astronomy.sunrise,
                            sunset    : channel.astronomy.sunset,
                            temp      : fahrenheitToCelsius(channel.item.condition.temp),
                            date      : formatDate(new Date(channel.item.condition.date.slice(0, -5))),
                            windSpeed : mphToKmh(channel.wind.speed),
                            windTemp  : fahrenheitToCelsius(channel.wind.chill)
                        });

                        console.log(result, channel);
                        resolve(result);

                    } else {
                        reject(resp);
                    }
                });
        });
    }

    precache(places: string[]) {
        places.forEach(place => this.serviceWorker.cache(WeatherService.getUrl(place)));
    }

}

