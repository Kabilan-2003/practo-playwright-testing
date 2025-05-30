import formData from '../data/formData.json';
export class Form{
    constructor(page){
        this.page = page;
        this.name = formData.name;
        this.company = formData.organization;
        this.phone = formData.contact;
        this.email = formData.email;
        this.size = page.locator('//select[@id="organizationSize"]').first();
        this.interested = page.locator('//select[@id="interestedIn"]').first();
    }   
    async fillForm(){
        await this.page.locator('//input[@id="name"]').first().fill(this.name);
        await this.page.locator('//input[@id="organizationName"]').first().fill(this.company);
        await this.page.locator('//input[@id="contactNumber"]').first().fill(this.phone);
        await this.page.locator('//input[@id="officialEmailId"]').first().fill(this.email);
        await this.size.click();
        await this.size.selectOption('501-1000');
        await this.interested.click();
        await this.interested.selectOption('Taking a demo');
    }
    async checkSubmitButton(){
        const submitButton = this.page.locator('//button[@type="submit"]').first();
        if(await submitButton.isEnabled()){
            await submitButton.click();
            return true;
        }
        return false;
    }

}