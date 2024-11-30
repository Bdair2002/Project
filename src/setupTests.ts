/* eslint-disable */
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextDecoder, TextEncoder } from 'util';
import { TransformStream } from 'web-streams-polyfill/';
global.TransformStream = TransformStream;
global.TextEncoder = TextEncoder as any;

global.TextDecoder = TextDecoder as any;
