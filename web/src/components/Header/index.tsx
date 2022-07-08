import React, { FormEvent, useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { BiSearchAlt2 } from "react-icons/bi";
import { FiLogOut } from 'react-icons/fi';

import {AuthContext} from '../../contexts/AuthContext'

export default function Header() {
  const { signOut, isAuthenticated } = useContext(AuthContext)
  
  function handleClick() {
    signOut()
    location.reload();
  }
  
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <form>
          <input type="text" />

          <button type="submit">
            <BiSearchAlt2/>
          </button>
        </form>

        {isAuthenticated ? (
          <>
            <nav>
              <Link href="/vehicles">
                Veículos
              </Link>

              <Link href="/vehicle">
                Cadastrar Veículo
              </Link>

              <button onClick={handleClick}>
                <FiLogOut/>
              </button>
            </nav>
          </>
        ) : (
          <>        
            <nav>
              <Link href="/signin">
                Entrar
              </Link>

              <Link href="/signup">
                Cadastrar
              </Link>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}
