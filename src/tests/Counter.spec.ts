import { tick } from 'svelte';
import Counter from '../lib/Counter.svelte'

let host: HTMLElement

afterEach(() => {
  host.remove()
})

test('mount component', async () => {
  host = document.createElement('div')
  host.setAttribute('id', 'host')
  document.body.appendChild(host)
  const instance = new Counter({ target: host, props: { count: 0 } })
  expect(instance).toBeTruthy()
  expect(host.innerHTML).toContain('count is 0')
  expect(host.innerHTML).toMatchSnapshot()
  const btn = host.getElementsByTagName('button')[0]
  btn.click() // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
  await tick()
  expect(host.innerHTML).toContain('count is 1')
  btn.click()
  await tick()
  expect(host.innerHTML).toContain('count is 2')
})
