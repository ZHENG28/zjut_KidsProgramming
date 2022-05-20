const fse = require('fs-extra')
const exec = require('child_process').exec
const path = require('path')

// !若对应地址文件夹没有则报错
async function write_code(write_path, code) {
    // TODO: 在多个测评并发执行时，需要修改写入路径
    return new Promise((resolve, reject) => {
      fse.writeFile(write_path, code, (err) => {
        if (err) {
          reject('写入test.py时出错')
        }
        resolve('写入test.py成功') 
      })
    })
}

async function compile(compile_config, code_path) {
    let compile_command = compile_config.compile_command + code_path
    return new Promise((resolve, reject) => {
      exec(compile_command, (err, stdout, stderr) => {
        if(err) {
          throw err
        }
        // *返回的是编译之后的相对地址
        // TODO: 目前测试仅使用test的文件名
        resolve(compile_config.exe_path + 'test' + compile_config.exe_extension)
      })
    })
}

// *若没有对应文件夹，直接生成文件夹out和log；若有文件夹则清空
async function emptyDir(tests_path) {
  return new Promise((resolve, reject) => {
    fse.emptyDir(path.join(tests_path, './out'), err => {
      if(err) throw err
      console.log('success')
    })
  
    fse.emptyDir(path.join(tests_path, './log'), err => {
      if(err) throw err
      console.log('success')
    })

    resolve('获取空文件夹成功')
  })
}

// *获得的是.in结尾的数组
async function getListOfIn(dir) {
  return new Promise((resolve, reject) => {
      fse.readdir(dir, (err, data) => {
          if(err) throw err
          inList = data.filter(item => item.endsWith('.in')).map(value => value.replace('.in', ''))
          resolve(inList)
      })
  })
}

// *仅运行一个测试点的代码
async function runCode(lang_config, inoutDir, inFileName, tests_path) {
    let compile_config = lang_config.compile
    let run_config = lang_config.run

    let pyc_path = compile_config.exe_path
    let pyc_extension = compile_config.exe_extension
    let max_cpu_time = run_config.max_cpu_time
    let max_real_time = run_config.max_real_time
    let max_memory = run_config.max_memory
    let exe_path = run_config.command

    return new Promise(async function (resolve, reject) {
      
      let command = `/usr/lib/judger/libjudger.so --args=${path.join(tests_path, `./${pyc_path}test${pyc_extension}`)} `+ 
      `--max_cpu_time=${max_cpu_time} `+
      `--max_real_time=${max_real_time} `+
      `--max_memory=${max_memory} `+
      `--max_stack=33554432 `+
      `--max_output_size=10000 `+
      `--max_process_number=200 `+
      `--uid=99 `+
      `--gid=99 `+
      `--memory_limit_check_only=0 `+
      `--exe_path=${exe_path} `+
      `--input_path=${inoutDir}/${inFileName}.in `+
      `--output_path=${path.join(tests_path, '../tests/out/')}${inFileName}.out `+
      `--error_path=${path.join(tests_path, '../tests/out/')}${inFileName}.out `+
      `--log_path=${path.join(tests_path, '../tests/log/')}${inFileName}.log `+
      `--seccomp_rule=general`
      console.log('command: ', command);

      exec(command, async (err, stdout, stderr) => {
        if (err) {
          reject(new Error('' + err))
        } else {
          stdout = JSON.parse(stdout.replace(/'/g, "\""))
          // TODO: 测试可以加参数stdout
          resolve(stdout)
        }
      })
    })
}

// *这里参数的result是单纯命令行得到的结果组成的字符串，未经过比较
async function compareOutFile(result, inoutDir, outDir) {

    return new Promise((resolve, reject) => {
      for(let i = 0; i< result.length; i++){
        if(result[i] === '0'){

          // 标准输出
          let p = new Promise((resolve, reject) => {
            fse.readFile(path.join(inoutDir,`${i + 1}.out`), (err, data) => {
              if (err) throw err
              resolve(data.toString())
            })
          })
          p.then(value => {
            fse.readFile(path.join(outDir,`${i + 1}.out`), (err, data) => {
              if (err) throw err
              value = value + '\n'
              data = data.toString()
              console.log('data: ', data);
              console.log('value: ', value);
              console.log( value !== data);
              if(value !== data){
                //修改对应位置为1
                result = result.substring(0, i) + '1' + result.substring(i + 1)
                console.log('result: ', result);
              }
              if(result.substring(i + 1).indexOf('0') === -1){
                resolve(result)
              }
            })
          })
        }
      }
    })
}

module.exports = {
    write_code,
    compile,
    emptyDir,
    getListOfIn,
    runCode,
    compareOutFile,
}