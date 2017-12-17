import { constantToCamelCase, camelToTitleCase } from 'utils'

describe('constantToCamelCase', () =>
  test('Converts strings correctly.', () =>
    expect(constantToCamelCase('HELLO_WORLD_TEST_STRING')).toBe(
      'helloWorldTestString'
    )))

describe('camelToTitleCase', () =>
  test('Converts strings correctly.', () =>
    expect(camelToTitleCase('helloWorldTestString')).toBe(
      'Hello World Test String'
    )))
