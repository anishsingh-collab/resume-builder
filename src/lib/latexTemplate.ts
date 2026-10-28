import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

function escapeLatex(str: string | undefined | null) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\textbackslash ')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde ')
    .replace(/\\^/g, '\\textasciicircum ');
}

// Override Handlebars escape function for LaTeX
Handlebars.Utils.escapeExpression = function(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return escapeLatex(string);
};

export const generateLatex = (data: any, templateId: string = 'classic') => {
  const templatePath = path.join(process.cwd(), 'src', 'lib', 'templates', `${templateId}.tex.hbs`);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template ${templateId} not found`);
  }

  const templateString = fs.readFileSync(templatePath, 'utf8');
  
  // We use noEscape: false to ensure our custom escapeExpression (LaTeX escaping) is used on all {{vars}}
  const compiledTemplate = Handlebars.compile(templateString, { noEscape: false });
  
  return compiledTemplate(data);
}
