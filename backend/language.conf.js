module.exports = {
    py2_lang_config : {
        "compile": {
            "src_name": "solution.py",
            "exe_path": "",
            "exe_extension": ".pyc",
            "compile_command" : "/usr/bin/python -m py_compile ",
        },
        "run": {
            "max_cpu_time": 3000,
            "max_real_time": 5000,
            "max_memory": 128 * 1024 * 1024,
            "command": "/usr/bin/python",
            "seccomp_rule": "general",
        }
    },
    
    py3_lang_config : {
        "compile": {
            "src_name": "solution.py",
            "exe_path": "__pycache__/",
            "exe_extension": ".cpython-37.pyc",
            "compile_command": "/usr/bin/python3 -m py_compile ",
        },
        "run": {
            "max_cpu_time": 3000,
            "max_real_time": 5000,
            "max_memory": 128 * 1024 * 1024,
            "command": "/usr/bin/python3",
            "seccomp_rule": "general",
        }
    }
}