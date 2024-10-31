import sys
import os

# 添加应用目录到 Python 路径
INTERP = os.path.expanduser("/path/to/your/virtualenv/bin/python")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# 设置项目路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 导入 FastAPI 应用
from app.main import app

# 创建 WSGI 应用
application = app