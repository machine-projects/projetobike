import { describe, it, expect, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import UserDropdownVue from '../src/components/UiElements/UserDropdown.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../src/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'

const mockRouter = createRouter({ history: createWebHistory(), routes: [] })

describe('UserDropdown opened test', () => {
  const wrapper = mount(UserDropdownVue, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      },
      plugins: [
        mockRouter,
        createTestingPinia({
          initialState: {
            user: {
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
  const userStore = useUserStore()

  it('User menu status should be true', async () => {
    wrapper.get('.showUserBtn').trigger('click')
    expect(wrapper.find('#dropdown')).toBeTruthy()
  })
  it('Dropdown opened should contain all the link buttons', async () => {
    expect(wrapper.find('#dropdown').html()).toContain(userStore.user.firstName)
    expect(wrapper.find('#dropdown').html()).toContain(userStore.user.lastName)
    expect(wrapper.find('#dropdown').html()).toContain(userStore.user.email)
    expect(wrapper.find('#dropdown').html()).toContain('Ver perfil')
    expect(wrapper.find('#dropdown').html()).toContain('Configurações')
    expect(wrapper.find('#dropdown').html()).toContain('Dashboard')
    expect(wrapper.find('#dropdown').html()).toContain('Sair')
  })
  it('Dropdown has all the navigation tabs with the correct router links to', async () => {
    expect(
      wrapper.find('#dropdownDashboardRouter1').attributes('to')
    ).toContain('/dashboard')
    expect(wrapper.find('#dropdownProfileRouter').attributes('to')).toContain(
      '/dashboard/perfil'
    )
    expect(wrapper.find('#dropdownConfigRouter').attributes('to')).toContain(
      '/dashboard/configuracoes'
    )
    expect(
      wrapper.find('#dropdownDashboardRouter2').attributes('to')
    ).toContain('/dashboard')
  })
  it('Logout button should change store state', async () => {
    const router = useRouter()
    wrapper.find('#dropdownLogoutBtn').trigger('click')
  })
})
