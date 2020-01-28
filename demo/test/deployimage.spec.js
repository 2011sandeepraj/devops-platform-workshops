// Generated by Selenium IDE
const WebDriverFactory = require('./WebDriverFactory')
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const {spawn} = require('child_process')


describe('deploy-image', function() {
  this.timeout(60000)
  let driver
  let vars

  function filterOverviewByName(name){
    return driver.wait(until.elementLocated(By.css("div.name-filter.ng-scope > form > div > div > input")), 5000)
    .then(element => { return element.clear().then(()=>{ return element})})
    .then(element => { return element.sendKeys(name) })
  }

  async function say(sentence){
    await new Promise((resolve, reject)=>{
      const proc = spawn('say', ['-v', 'Samantha', '--rate=20', sentence]);
      proc.on("exit", (code)=>{
        if (code != 0){
          return reject(new Error(`'say' failed with exit code ${code}`))
        }
        resolve(code)
      })
    })
  }

  beforeEach(async function() {
    driver = await new WebDriverFactory().build()
    vars = {}
  })

  afterEach(async function() {
    //await driver.quit();
  })

  it('deploy-rocketchat', async function() {
    function selectFromDropdown(value){
      return driver.wait(until.elementLocated(By.css("body > div.ui-select-container.ui-select-bootstrap.dropdown.open > ul")), 5000)
      .then((dropdown)=>{
        return driver.findElement(By.css(".open > .form-control")).sendKeys(value)
        .then(()=>{
          return driver.findElement(By.css(".ui-select-highlight")).click()
        })
        .then(()=>{
          return driver.wait(until.elementIsNotVisible(dropdown), 60000)
        })
      })
    }

    //await driver.manage().window().setRect(1680, 945)
    
    //Wait for GitHub Login
    let narration=say("Let's start by going to GitHub and make sure we are logged in. If not you will need to enter your credentials")
    await driver.get("https://github.com/login")
    await driver.wait(until.elementLocated(By.css('div.header-nav-current-user > a.user-profile-link')), 60000)
    await narration

    narration=say("Let's go to the  OpenShift Web Console")
    //Wait for OpenShift Login
    await driver.get("https://console.pathfinder.gov.bc.ca:8443/console/catalog")
    await driver.wait(until.elementLocated(By.css('#user-dropdown > span.username.truncate.ng-binding')), 60000)
    await narration

    //View All
    await say("Find our workshop namespace for dev by clicking on 'View All'")
    .then(()=>{
      return driver.wait(until.elementLocated(By.css('body > div.container-pf-nav-pf-vertical > div > div > div > landing-page > div.landing > div.landing-side-bar > landingside > projects-summary > div > div.catalog-project-summary-list.ng-scope > div.projects-count > a')), 60000)
      .then((element)=>{
        return element.click()
      })
    })

    // Search for the "Openshift 101"
    await say("Enter 'OpenShift 1-0-1' in the search field")
    .then(()=>{
      return driver.wait(until.elementLocated(By.css('#search-projects')), 60000)
      .then((element)=>{
        return element.sendKeys("openshift 101")
      })
    })

    // Select the dev one
    await say("Select the dev one").then(()=>{
      return driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "list-pf-content-wrapper")]/div/div[contains(@class, project-name-item)]/h2/a[@title="Openshift 101 (dev)" and substring(@href, string-length(@href)-3, 4)="-dev"]')), 60000)
      .then((element)=>{
        return element.click()
      })
    })
    throw new Error("Stop!");
    await filterOverviewByName("rocketchat-cvarjao3");

    // Delete existing deployment
    await new Promise((resolve, reject)=>{
      const proc = spawn('oc', ['-n', 'zswelr-dev', 'delete', 'all', '-l', 'app=rocketchat-cvarjao3']);
      proc.on("exit", (code)=>{
        if (code != 0){
          return reject(new Error(`'oc delete' failed with exit code ${code}`))
        }
        resolve(code)
      })
    })


    // Click on "Add to Project" > and "Deploy Image"
    await driver.wait(until.elementLocated(By.css(".dropdown-toggle > .hidden-xs:nth-child(2)")), 60000)
    .then((element)=>{
      return element.click()
    })
    await driver.wait(until.elementLocated(By.linkText("Deploy Image")), 6000).then((element)=>{return element.click()})

    //Wait for wizard form to show up
    await driver.wait(until.elementLocated(By.css(".wizard-pf-body")), 6000).click()
    await driver.findElement(By.css(".form-group:nth-child(1) .ui-select-placeholder")).click()
    await selectFromDropdown("zswelr-tools")
    
    
    await driver.findElement(By.css(".form-group:nth-child(2) .ui-select-placeholder")).click()
    await selectFromDropdown("cvarjao")
    await driver.findElement(By.css(".form-group:nth-child(3) .ui-select-placeholder")).click()
    await selectFromDropdown("dev")
    await driver.findElement(By.id("name")).then((element)=>{
      return driver.executeScript("arguments[0].scrollIntoView()", element)
    }).then(async (element) => {
      await driver.findElement(By.id("name")).click()
      await driver.findElement(By.id("name")).sendKeys("rocketchat-cvarjao3")
    })

    await driver.findElement(By.id("nextButton")).click()
    await driver.wait(until.elementLocated(By.linkText("Continue to the project overview")), 6000).then((element)=>{return element.click()})
    
    await filterOverviewByName("rocketchat-cvarjao3");

    // .project-bar

    await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "app-heading")]/h2[span="rocketchat-cvarjao3"]/parent::div/following-sibling::div/descendant::div[@class="list-pf-chevron"]/descendant::a')), 6000)
    .then((element)=>{
      return element.click()
      //return driver.executeScript("arguments[0].scrollIntoView()", element)
    })
  })



  it('deploy-mongodb', async function() {
    await driver.get("https://console.pathfinder.gov.bc.ca:8443/console/project/zswelr-dev/overview")
    await driver.wait(until.elementLocated(By.id("search-input")), 6000)
    .then((element)=>{return element.click().then(()=>{return element})})
    .then((element)=>{return element.sendKeys("mongodb ephemeral").then(()=>{return element})})
    .then((element)=>{
      return element.getAttribute("aria-owns")
    })
    .then((dropDownID)=>{
      return driver.wait(until.elementLocated(By.css(`#${dropDownID}-option-0 .catalog-search-match-label`)), 12000)
      .then(element=>{
        return element.click();
      })
    })

    await driver.wait(until.elementLocated(By.id("nextButton")), 6000).then((element)=>{return element.click()})
    
    await driver.wait(until.elementLocated(By.id("DATABASE_SERVICE_NAME")), 6000)
    .then((element)=>{return element.click().then(()=>{return element})})
    .then((element)=>{return element.clear().then(()=>{return element})})
    .then((element)=>{return element.sendKeys("mongodb-cvarjao3")})

    await driver.wait(until.elementLocated(By.id("MONGODB_USER")), 6000)
    .then((element)=>{return element.click().then(()=>{return element})})
    .then((element)=>{return element.clear().then(()=>{return element})})
    .then((element)=>{return element.sendKeys("dbuser")})

    await driver.wait(until.elementLocated(By.id("MONGODB_PASSWORD")), 6000)
    .then((element)=>{return element.click().then(()=>{return element})})
    .then((element)=>{return element.clear().then(()=>{return element})})
    .then((element)=>{return element.sendKeys("dbpass")})

    await driver.wait(until.elementLocated(By.id("MONGODB_DATABASE")), 6000)
    .then((element)=>{return element.click().then(()=>{return element})})
    .then((element)=>{return element.clear().then(()=>{return element})})
    .then((element)=>{return element.sendKeys("rocketchat")})

    await driver.wait(until.elementLocated(By.id("MONGODB_VERSION")), 6000)
    .then((element)=>{return element.click().then(()=>{return element})})
    .then((element)=>{return element.clear().then(()=>{return element})})
    .then((element)=>{return element.sendKeys("2.6")})

    await driver.wait(until.elementLocated(By.id("nextButton")), 6000).then((element)=>{return element.click()})
    //await driver.findElement(By.css(".bind-choice:nth-child(1)")).click()
    await driver.findElement(By.css(".bind-choice:nth-child(3)")).click()
    await driver.wait(until.elementLocated(By.id("nextButton")), 6000).then((element)=>{return element.click()})

    await driver.wait(until.elementLocated(By.linkText("Continue to the project overview")), 6000).then((element)=>{return element.click()})
    filterOverviewByName("cvarjao3")
  })
})
