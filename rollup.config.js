import pkg from './package.json'
import rpi_resolve from 'rollup-plugin-node-resolve'
import rpi_commonjs from 'rollup-plugin-commonjs'

const plugins = [
  rpi_resolve(),
  rpi_commonjs({ include: 'node_modules/**', sourceMap: false }),
]
const external = [
  'path',
  '@parcel/plugin',
  '@parcel/source-map',
  '@parcel/utils',
]

export default {
	input: 'code/jsy_parcel_xform.js',
	output: [
		{file: pkg.module, format: 'es'},
		{file: pkg.main, format: 'cjs'}],
  plugins, external}

