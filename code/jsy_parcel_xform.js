import {Transformer} from '@parcel/plugin';
import SourceMap from '@parcel/source-map';
import {relativeUrl} from '@parcel/utils';

import jsy_transpile_snapshot from 'jsy-transpile'

let jsy_transpile = jsy_transpile_snapshot
try { jsy_transpile = require('jsy-transpile') } catch (err) {}

export default new Transformer({
  async transform({asset, options}) {
    let source = relativeUrl(options.projectRoot, asset.filePath)

    asset.type = 'js'

    try {
      let src_map = options.sourceMaps ? new SourceMap() : null

      const res = jsy_transpile(await asset.getCode(), {
        addSourceMapping(arg) {
          if (null === src_map) return;
          arg.source = source
          src_map.addMapping(arg)
        }, })

      if (null !== src_map)
        asset.setMap(src_map)

      asset.setCode(res)
      return [asset]

    } catch (err) {
      if (undefined !== err.src_loc) {
        console.error('Error in JSY transpile:', err.src_loc.pos, err)
        throw err
      } else throw err
    }
  }
});
