import React, { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { BiSearchAlt2 } from "react-icons/bi";
import { FiLogOut } from 'react-icons/fi';

import {AuthContext} from '../../contexts/AuthContext'

export default function Header() {
  const {signOut} = useContext(AuthContext)
  
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <form>
          <input type="text" />

          <button type="submit">
            <BiSearchAlt2/>
          </button>
        </form>

        <nav>
          <Link href="/signin">
            Entrar
          </Link>

          <Link href="/signup">
            Cadastrar
          </Link>

          <button onClick={signOut}>
            <FiLogOut/>
          </button>
        </nav>
      </div>
    </header>
  )
}
