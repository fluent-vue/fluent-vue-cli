import { sync as rimraf } from 'rimraf'

import ExportCommand from  '../../src/commands/export'

describe('export', () => {
  let result: string | Uint8Array | undefined;

	beforeEach(() => {
		result = undefined;
		jest
			.spyOn(process.stdout, 'write')
			.mockImplementation((val: string | Uint8Array): boolean => {
				result = val
        return true
      });
	});

	afterEach(() => {
    jest.restoreAllMocks()

    rimraf('translations')
  })

  it('extracts ftl messages from .vue files', async () => {
    // Act
    await ExportCommand.run(['__tests__/fixtures/*.vue'])

    // Assert
    expect(result).toContain('Extracted messages from 2 files')
  })
})
