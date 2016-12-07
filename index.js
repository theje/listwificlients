"use strict";
var child_process = require("child_process");
var Promise = require("bluebird");
function listwifi(device) {
    return new Promise(function (resolve, reject) {
        child_process.exec('iw dev ' + device + ' station dump', function (err, stdout, stderr) {
            if (err) {
                reject(err);
            }
            else {
                var reallist = [];
                var list = stdout.split('\n');
                for (var i = 0; i < stdout.split('\n').length; i++) {
                    if (stdout.split('\n')[i].split('Station ').length > 1) {
                        var station = { mac: stdout.split('\n')[i].split('Station ')[1].split(' ')[0], signal: '' };
                        reallist.push(station);
                    }
                    else if (stdout.split('\n')[i].split('signal: ').length > 1) {
                        if (stdout.split('\n')[i].split('signal: ')[1].split('\t')[1].split('[').length > 1) {
                            reallist[reallist.length - 1].signal = stdout.split('\n')[i].split('signal: ')[1].split('\t')[1].split('[')[0] + 'dBm';
                            reallist[reallist.length - 1].signalMin = stdout.split('\n')[i].split('signal: ')[1].split('[')[1].split(',')[0] + ' dBm';
                            reallist[reallist.length - 1].signalMax = stdout.split('\n')[i].split('signal: ')[1].split('[')[1].split(', ')[1].split(']')[0] + ' dBm';
                        }
                        else {
                            reallist[reallist.length - 1].signal = stdout.split('\n')[i].split('signal: ')[1].split('\t')[1];
                        }
                    }
                }
                resolve(reallist);
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = listwifi;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLGFBQWEsV0FBTSxlQUUvQixDQUFDLENBRjZDO0FBRTlDLElBQVksT0FBTyxXQUFNLFVBSXpCLENBQUMsQ0FKa0M7QUFhbkMsa0JBQWlDLE1BQWM7SUFDM0MsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixVQUFDLE9BQU8sRUFBRSxNQUFNO1FBRTlDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxlQUFlLEVBQUUsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFFbEYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRUosSUFBTSxRQUFRLEdBQWlCLEVBQUUsQ0FBQTtnQkFDakMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFFL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNqRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckQsSUFBSSxPQUFPLEdBQWUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUUsQ0FBQTt3QkFDckcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDMUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xGLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTs0QkFDdEgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBOzRCQUN6SCxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO3dCQUU1SSxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBRXBHLENBQUM7b0JBQ0wsQ0FBQztnQkFFTCxDQUFDO2dCQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyQixDQUFDO1FBR0wsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDLENBQUMsQ0FBQTtBQUlOLENBQUM7QUF2Q0Q7MEJBdUNDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjaGlsZF9wcm9jZXNzIGZyb20gXCJjaGlsZF9wcm9jZXNzXCJcblxuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIlxuXG5cblxuaW50ZXJmYWNlIElXaWZpQ2xpZW50IHtcbiAgICBtYWM6IHN0cmluZztcbiAgICBzaWduYWw6IHN0cmluZztcbiAgICBzaWduYWxNaW4/OiBzdHJpbmc7XG4gICAgc2lnbmFsTWF4Pzogc3RyaW5nO1xuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdHdpZmkoZGV2aWNlOiBzdHJpbmcpOlByb21pc2U8SVdpZmlDbGllbnRbXT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJV2lmaUNsaWVudFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgY2hpbGRfcHJvY2Vzcy5leGVjKCdpdyBkZXYgJyArIGRldmljZSArICcgc3RhdGlvbiBkdW1wJywgZnVuY3Rpb24gKGVyciwgc3Rkb3V0LCBzdGRlcnIpIHtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbGxpc3Q6SVdpZmlDbGllbnRbXSA9IFtdXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHN0ZG91dC5zcGxpdCgnXFxuJylcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Rkb3V0LnNwbGl0KCdcXG4nKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Rkb3V0LnNwbGl0KCdcXG4nKVtpXS5zcGxpdCgnU3RhdGlvbiAnKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdGlvbjpJV2lmaUNsaWVudCA9IHsgbWFjOiBzdGRvdXQuc3BsaXQoJ1xcbicpW2ldLnNwbGl0KCdTdGF0aW9uICcpWzFdLnNwbGl0KCcgJylbMF0sc2lnbmFsOicnIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxsaXN0LnB1c2goc3RhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGRvdXQuc3BsaXQoJ1xcbicpW2ldLnNwbGl0KCdzaWduYWw6ICcpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGRvdXQuc3BsaXQoJ1xcbicpW2ldLnNwbGl0KCdzaWduYWw6ICcpWzFdLnNwbGl0KCdcXHQnKVsxXS5zcGxpdCgnWycpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFsbGlzdFtyZWFsbGlzdC5sZW5ndGggLSAxXS5zaWduYWwgPSBzdGRvdXQuc3BsaXQoJ1xcbicpW2ldLnNwbGl0KCdzaWduYWw6ICcpWzFdLnNwbGl0KCdcXHQnKVsxXS5zcGxpdCgnWycpWzBdICsgJ2RCbSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFsbGlzdFtyZWFsbGlzdC5sZW5ndGggLSAxXS5zaWduYWxNaW4gPSBzdGRvdXQuc3BsaXQoJ1xcbicpW2ldLnNwbGl0KCdzaWduYWw6ICcpWzFdLnNwbGl0KCdbJylbMV0uc3BsaXQoJywnKVswXSArICcgZEJtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxsaXN0W3JlYWxsaXN0Lmxlbmd0aCAtIDFdLnNpZ25hbE1heCA9IHN0ZG91dC5zcGxpdCgnXFxuJylbaV0uc3BsaXQoJ3NpZ25hbDogJylbMV0uc3BsaXQoJ1snKVsxXS5zcGxpdCgnLCAnKVsxXS5zcGxpdCgnXScpWzBdICsgJyBkQm0nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhbGxpc3RbcmVhbGxpc3QubGVuZ3RoIC0gMV0uc2lnbmFsID0gc3Rkb3V0LnNwbGl0KCdcXG4nKVtpXS5zcGxpdCgnc2lnbmFsOiAnKVsxXS5zcGxpdCgnXFx0JylbMV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZWFsbGlzdClcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pXG5cbiAgICB9KVxuXG5cblxufVxuIl19
