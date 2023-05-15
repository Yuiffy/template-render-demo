const renderTemplate = (template, obj) => {
  const str = template.replace(/\{.+?\}/, (match) => {
    const varName = match.slice(1, -1); // 去除前后的"{}"两个字符
    return obj[varName];
  });
  return str;
}

console.log(renderTemplate('Hello, {nickname}!', { nickname: 'Yuiffy' }));
