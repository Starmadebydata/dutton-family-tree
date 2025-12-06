# duttonlegacy.com 部署配置指南

## 当前问题诊断

### 1. Content Security Policy (CSP) 错误
**错误信息**: 
```
Loading the font '<URL>' violates the following Content Security Policy directive: 
"default-src 'none'". Note that 'font-src' was not explicitly set, so 
'default-src' is used as a fallback.
```

**问题**: duttonlegacy.com 的服务器配置了过于严格的 CSP 策略，阻止加载外部资源（如字体）。

**解决方案**: 在 duttonlegacy.com 的服务器响应头中添加以下 CSP 指令：
```
Content-Security-Policy: default-src 'self'; 
                          font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
                          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                          script-src 'self' 'unsafe-inline' 'unsafe-eval';
                          img-src 'self' data: https:;
```

---

### 2. JavaScript 错误
**错误信息**: 
```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at share-modal.js:1:135
```

**问题**: `share-modal.js` 中的 JavaScript 代码试图访问一个不存在的 DOM 元素。

**解决方案**: 检查 duttonlegacy.com 中的 `share-modal.js` 文件，确保相应的 HTML 元素已在页面中定义。

---

### 3. EPISODES_GUIDE.md 404 错误
**错误信息**: 
```
EPISODES_GUIDE.md:1  Failed to load resource: the server responded with a status of 404 ()
```

**问题**: duttonlegacy.com 的 `/series/yellowstone` 页面或其资源服务器无法找到 `EPISODES_GUIDE.md` 文件。

**解决方案**: 

#### 选项 A: 直接引用 GitHub 源文件（推荐）
修改 duttonlegacy.com 的后端，使其从 GitHub 拉取 markdown 文件而不是本地存储：

```
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/EPISODES_GUIDE.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/YELLOWSTONE_RESEARCH.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/DUTTON_FAMILY_GENEALOGY.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/README.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/INDEX.md
```

#### 选项 B: 上传文件到 duttonlegacy.com
将以下文件上传到 duttonlegacy.com 的服务器：
- `EPISODES_GUIDE.md`
- `YELLOWSTONE_RESEARCH.md`
- `DUTTON_FAMILY_GENEALOGY.md`
- `README.md`
- `INDEX.md`

---

## 必需的 Markdown 文件清单

以下文件已在此 GitHub 仓库中准备就绪，可供 duttonlegacy.com 使用：

| 文件名 | 用途 | 行数 | 大小 |
|------|------|------|------|
| README.md | 项目概览和快速入门 | ~200 | ~10KB |
| EPISODES_GUIDE.md | 所有系列剧集指南 | ~600 | ~50KB |
| YELLOWSTONE_RESEARCH.md | 详细研究文档 | ~400 | ~35KB |
| DUTTON_FAMILY_GENEALOGY.md | 家族树和人物信息 | ~500 | ~40KB |
| INDEX.md | 导航索引 | ~150 | ~8KB |

### GitHub 原始文件链接
```
README.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/README.md

EPISODES_GUIDE.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/EPISODES_GUIDE.md

YELLOWSTONE_RESEARCH.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/YELLOWSTONE_RESEARCH.md

DUTTON_FAMILY_GENEALOGY.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/DUTTON_FAMILY_GENEALOGY.md

INDEX.md
https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main/INDEX.md
```

---

## GitHub Pages 落地页配置

此 GitHub Pages 落地页（https://starmadebydata.github.io/dutton-family-tree/）已正确配置，所有链接指向：

### Series Pages (系列页面)
- https://duttonlegacy.com/series/yellowstone
- https://duttonlegacy.com/series/1883
- https://duttonlegacy.com/series/1923

### Documentation Pages (文档页面)
- https://duttonlegacy.com/ (README)
- https://duttonlegacy.com/episodes (EPISODES_GUIDE)
- https://duttonlegacy.com/research (YELLOWSTONE_RESEARCH)
- https://duttonlegacy.com/family-tree (DUTTON_FAMILY_GENEALOGY)
- https://duttonlegacy.com/index (INDEX)

---

## 推荐的 duttonlegacy.com 后端配置

### 文件获取策略
```javascript
// 从 GitHub 动态获取 markdown 文件
async function getMarkdownContent(filename) {
  const baseUrl = 'https://raw.githubusercontent.com/Starmadebydata/dutton-family-tree/main';
  const response = await fetch(`${baseUrl}/${filename}`);
  if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
  return response.text();
}

// 路由映射
const routeMap = {
  '/series/yellowstone': 'EPISODES_GUIDE.md',
  '/series/1883': 'EPISODES_GUIDE.md',
  '/series/1923': 'EPISODES_GUIDE.md',
  '/episodes': 'EPISODES_GUIDE.md',
  '/research': 'YELLOWSTONE_RESEARCH.md',
  '/family-tree': 'DUTTON_FAMILY_GENEALOGY.md',
  '/': 'README.md',
  '/index': 'INDEX.md'
};
```

### 服务器配置示例 (Next.js)
```javascript
export async function getServerSideProps(context) {
  const path = context.resolvedUrl;
  const filename = routeMap[path];
  
  if (!filename) return { notFound: true };
  
  try {
    const content = await getMarkdownContent(filename);
    return {
      props: { content, path },
      revalidate: 3600 // 1 小时重新验证
    };
  } catch (error) {
    return { notFound: true };
  }
}
```

---

## 故障排查清单

- [ ] 检查 duttonlegacy.com 的 CSP 响应头配置
- [ ] 验证 `share-modal.js` 中的 DOM 元素存在
- [ ] 确认 Markdown 文件可从指定位置访问
- [ ] 测试 `/series/yellowstone` 路由是否返回正确内容
- [ ] 清除浏览器缓存后重新测试
- [ ] 检查服务器日志获取更详细的 404 错误原因

---

## 联系和支持

如需更多帮助，请：
1. 查看 GitHub 仓库中的原始文件
2. 检查 duttonlegacy.com 的后端日志
3. 验证文件权限和网络连接
