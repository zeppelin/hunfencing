import * as fs from 'fs';
import { parse as parseJSONC } from 'jsonc-parser';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

export const readMappingsFromFile = async (resource: string): Promise<Dict<unknown>> => {
  let mappingsData = await readFile(`${process.cwd()}/lib/scraper/mappings/${resource}.jsonc`, 'utf-8');
  let mappings = parseJSONC(mappingsData);
  return mappings;
}
