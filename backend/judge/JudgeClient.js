const fse = require('fs-extra')
const utils = require('./utils')
const path = require('path')

module.exports = class JudgeClient{
    constructor(config){
        this.lang_config = config
        this.compile_config = config.compile
        this.run_config = config.run
        // this.exe_path = exe_path
        // this.max_cpu_time = max_cpu_time
        // this.max_memory = max_memory
    }
    async judge(code, inoutPath) {
        try {
            let tests_path = path.join(__dirname, '../tests')
            let code_path = path.join(tests_path,'./test.py')

            await utils.write_code(code_path, code)
            await utils.compile(this.compile_config, code_path)

            let inFileNameList = await utils.getListOfIn(inoutPath)
            
            await utils.emptyDir(tests_path)
            // 要删的
            let i = 0
            let judge_result = ''
            inFileNameList.forEach(async inFileName => {
                let result = await utils.runCode(this.lang_config, inoutPath, inFileName, tests_path)  
                i++
                judge_result += result.result
                console.log(i,'judge_result'+judge_result)
                console.log(`result${i}: `, result);
                if(i === inFileNameList.length){
                    let inout_result =await utils.compareOutFile(judge_result, path.join(__dirname, '../tests/inout/'), path.join(__dirname, '../tests/out/'))
                    console.log('inout_result: ', inout_result);
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}

