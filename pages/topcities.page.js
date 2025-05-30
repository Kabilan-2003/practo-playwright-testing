export class Cities {
    constructor(page) {
        this.page = page;
        this.cityNamesLocator = page.locator('//div[@class="u-margint--standard o-f-color--primary"]');
    }

    async getTopCities() {
        
        const cityLocators = await this.cityNamesLocator.all(); 
        
        
        const citiesPromises = cityLocators.map(async (cityLocator) => {
            return await cityLocator.textContent(); 
        });

        const cities = await Promise.all(citiesPromises);

        return cities.map(city => city.trim());
    }
}