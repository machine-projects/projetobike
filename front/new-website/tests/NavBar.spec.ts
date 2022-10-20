import { expect, describe, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import NavBar from '../src/components/NavBar.vue'
import { useUserStore } from '../src/stores/userStore'
import UserDropdownVue from '../src/components/UiElements/UserDropdown.vue'

describe('Navbar Test wih user logged in', () => {
  const wrapper = mount(NavBar, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn(),
          initialState: {
            user: {
              isLoggedIn: true,
              user: {
                firstName: 'Arthur',
                lastName: 'Barbosa',
                email: 'arthur1223@gmail.com'
              }
            }
          }
        })
      ]
    }
  })

  it('should render dashboard button and user dropdown should contain the user first and last name', async () => {
    const userStore = useUserStore()
    const dropDown = wrapper.findComponent(UserDropdownVue)

    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Eventos')

    expect(dropDown).toBeTruthy()
    expect(dropDown.text()).toContain(userStore.user.firstName)
    expect(dropDown.text()).toContain(userStore.user.lastName)
    expect(dropDown.find('.showUserBtn')).toBeTruthy()
  })

  it('router-link dashboard should have the right redirect', async () => {
    expect(wrapper.find('#dashboardRouter').attributes('to')).toBe('/dashboard')
  })

  it('user dropDown should exist', async () => {
    const dropDown = await wrapper.findComponent(UserDropdownVue)

    expect(dropDown.exists()).toBe(true)
  })
})

describe('Navbar Test wih user logged off', () => {
  const wrapper = mount(NavBar, {
    stubs: ['router-link', 'router-view'],
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn(),
          initialState: {
            user: {
              isLoggedIn: false
            }
          }
        })
      ]
    }
  })

  it('should not render dashboard button and user dropdown', async () => {
    expect(wrapper.text()).not.toContain('Dashboard')
    expect(wrapper.findComponent(UserDropdownVue).exists()).toBe(false)
  })

  it('should render events, sign in and register button', async () => {
    expect(wrapper.text()).toContain('Eventos')
    expect(wrapper.text()).toContain('Entrar')
    expect(wrapper.text()).toContain('Cadastre-se')
  })

  it('should not render Dashboard button', async () => {
    expect(wrapper.text()).not.toContain('Dashboard')
  })

  it('router-link components should have the right redirects', async () => {
    expect(wrapper.find('#logoRouter').attributes('to')).toBe('/')
    expect(wrapper.find('#eventosRouter').attributes('to')).toBe('/')
    expect(wrapper.find('#loginRouter').attributes('to')).toBe('/login')
    expect(wrapper.find('#registerRouter').attributes('to')).toBe('/cadastro')
  })
})
h
