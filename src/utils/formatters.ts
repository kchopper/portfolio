export const formatMultiline = (text: string) => {
  return text.trim().replace(/\n\s*/g, '\n');
};

export const formatCommand = (sections: { [key: string]: string[] }) => {
  return Object.entries(sections)
    .map(([title, items]) => {
      const sectionTitle = title ? `${title}:` : '';
      const sectionItems = items.join('\n');
      return [sectionTitle, sectionItems].filter(Boolean).join('\n');
    })
    .join('\n\n');
};

export const formatDateTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const formatPrompt = (theme: string, ip: string = '127.0.0.1') => {
  return `# ${ip} in ~/portfolio ${formatDateTime()}`;
}; 
