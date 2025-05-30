export class Search{
    constructor(page){
        this.page = page;
        this.searchHospitals = page.locator('//span[text()="Search for hospitals"]');
        this.forCorporate = page.locator('//div[@class="para cushion-right-large display-inline nav-items nav-items--additional-link hover-dark u-d-trigger dropdown-toggle"]');
    }
    async searchHospitalsList(){
        await this.searchHospitals.click();
    }

    async searchHealthWellness(){
        await this.page.forCorporate.click();
        await this.page.locator('//div[@class="para cushion-right-large display-inline nav-items nav-items--additional-link hover-dark u-d-trigger dropdown-toggle"]/descendant::div[2]').click();
    }
    
}