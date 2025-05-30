export class HospitalList {
    constructor(page) {
        this.page = page;
        this.location = page.locator('//input[@data-input-box-id="omni-searchbox-locality"]');
        this.citySuggestions = page.locator('//div[@data-qa-id="omni-suggestion-city"]').first();
    }

    async updateLocation(){
        await this.location.fill("Bangalore");
        await this.citySuggestions.click();
        await this.page.waitForLoadState('networkidle');
    }

    async checkTiming(hospital){
        const timing = await hospital.locator('//span[@class="pd-right-2px-text-green"]').innerText();
        if(timing === "Open 24x7"){
            return true;
        }
        return false;
    }

    async checkRating(hospital){
        const rating = await hospital.locator('//span[@class="u-bold"]').nth(2).innerText();
        const rate = parseFloat(rating);
        if(rate > 3.5){
            return true;
        }
        return false;
    }

    async checkParking(hospitalPage){
        const read_more_info = await hospitalPage.locator('//span[text()="Read more info"]');
        if(read_more_info.isVisible()){
            await read_more_info.scrollIntoViewIfNeeded();
            await read_more_info.click();
            const parking = await this.page.locator('//span[@data-qa-id="amenity_item" and text()="Parking"]');
            if(parking){
                return true;
            }
        }
        return false;
    }

    async hospitalValidation(hospital){

        const hospitalPromise = this.page.waitForEvent('popup');
        await hospital.locator('//h2[@class="line-1"]').click();
        const hospitalPage = await hospitalPromise;
        await hospitalPage.waitForLoadState('networkidle');
        if(await this.checkTiming(hospital) && await this.checkRating(hospital) && await this.checkParking(hospitalPage)){
            const name = await hospitalPage.locator('//span[@data-qa-id="hospital_name"]').innerText();
            await hospitalPage.close();
            return {
                name: name
            };
        }
        await hospitalPage.close();
        return null;
    }


    async  getHospitalsList(){
        var hospitalData = [];
        let len = 10;
        for(let i=0; i<len; i++){
            const hospital = this.page.locator('//div[@class="c-estb-card"]').nth(i);
            await hospital.waitFor('visible');
            await hospital.scrollIntoViewIfNeeded();
            const hospitalName = await this.hospitalValidation(hospital);
            if(hospitalName!==undefined && hospitalName!==null){
                hospitalData.push(hospitalName);
                
            }
            else{
                len++;
            }
        }
        return hospitalData;
    }
}