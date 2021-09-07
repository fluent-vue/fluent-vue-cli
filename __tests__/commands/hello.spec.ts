import HelloCommand from  '../../commands/hello'

describe('hello', () => {
  let result: string | undefined;

	beforeEach(() => {
		result = undefined;
		jest
			.spyOn(process.stdout, 'write')
			.mockImplementation((val: string): boolean => {
				result = val
        return true
      });
	});

	afterEach(() => jest.restoreAllMocks());

  it('runs hello', async () => {
    await HelloCommand.run([])

    expect(result).toContain('hello world')
  })

  it('runs hello --name jeff', async () => {
    await HelloCommand.run(['hello', '--name', 'jeff'])

    expect(result).toContain('hello jeff')
  })
})
