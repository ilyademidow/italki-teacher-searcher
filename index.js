// MIT License

// Copyright (c) 2021 Ilya Demidov

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/** Put the required language here */
const lang = "english";
/** Put the max price in italki cents here */
const max_price_in_cents = 700;
/** Put your timezone here (list of timezones https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) */
const tz = "Europe/Moscow";

let xhr = new XMLHttpRequest();

let teacherObject = {
    id: 0,
    url: "",
    name: "",
    price: "",
    avatar: "",
    greetVideo: "",
    originCountryId: ""
}
let accumTeacherList = [];
let teacherList;
let page = 1;

function getTeacherList(page) {
    return new Promise((resolve, reject) => {
        xhr.open("POST", "https://api.italki.com/api/v2/teachers");
        xhr.setRequestHeader("accept", "application/json, text/plain, */*");
        xhr.setRequestHeader("accept-language", "en-us");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-browser-key", "c795cc47-b029-4bd2-bb4e-1cc4478e1abd");
        xhr.setRequestHeader("x-device", "10");
        xhr.setRequestHeader("x-front-ver", "2.2.0");
        xhr.send(JSON.stringify({ "teach_language": { "language": lang, "max_price": max_price_in_cents, "is_native": 1 }, "page": page, "page_size": 50, "user_timezone": tz }));

        xhr.onreadystatechange = async function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    teacherList = JSON.parse(this.responseText);

                    teacherList.data.forEach(user => {
                        let teacher = Object.create(teacherObject);
                        teacher.id = user.user_info.user_id;
                        teacher.url = 'https://www.italki.com/teacher/' + user.user_info.user_id;
                        teacher.name = user.user_info.nickname;
                        teacher.originCountryId = user.user_info.origin_country_id;
                        teacher.avatar = user.teacher_info.qiniu_video_pic_url;
                        teacher.greetVideo = user.teacher_info.qiniu_video_url
                        accumTeacherList.push(teacher);
                    });
                    page++;
                    if (teacherList.paging.has_next === 1 && page < 10) { await getTeacherList(page); }
                    resolve(true);
                } else {
                    reject();
                }
            }
        }
    });
}

function getLowestPrice(teacher) {
    return new Promise((resolve, reject) => {
        xhr.open("GET", "https://api.italki.com/api/v2/teacher/" + teacher.id + "/course");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    let priceArr = [];
                    JSON.parse(this.responseText).data.pro_course_detail.forEach(course => {
                        course.price_list.forEach(course => priceArr.push(course.session_price))
                    });
                    teacher.price = Math.min(...priceArr);
                    resolve(teacher);
                } else {
                    reject();
                }
            }
        }
    });
}

async function main() {
    let content = '<tr><td><h3>Price</h3></td><td><h3>Name</h3></td><td></td><td><h3>Country</h3></td><td><h3>Greeting video</h3></td><td><h3>Link</h3></td></tr>';
    await getTeacherList(1);

    for (let i = 0; i < accumTeacherList.length; i++) {
        accumTeacherList[i] = await getLowestPrice(accumTeacherList[i]);
    }

    accumTeacherList.sort(function (teacherA, teacherB) {
        if (teacherA.price < teacherB.price) {
            return -1;
        } else if (teacherA.price > teacherB.price) {
            return 1;
        } else {
            return 0;
        }
    });

    accumTeacherList.forEach(newTc => {
        content = content + '<tr><td><h1>' + (newTc.price / 100) + ' $</h1></td><td><h1>' + newTc.name + '</h1></td><td>' + newTc.originCountryId + '</td><td><img src="https://scdn.italki.com/orion/static/flags/' + newTc.originCountryId.toLowerCase() + '.svg" class="ant-avatar" /></td>' +
            '<td><video controls width="360px" height="200px"><source src="' + newTc.greetVideo + '" type="video/mp4" /></video></td><td><a href="' + newTc.url + '">Personal page</a></td></tr>';
    });

    document.getElementsByTagName("body")[0].innerHTML = "<center><h1>Teacher list sort by price</h1></center><table>" + content + "</table>";
}

main();