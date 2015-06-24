class Bank
  def initialize(name)
    @name = name
    @accounts = []
  end

  def name
    @name
  end

  def accounts
    @accounts
  end

  def open_account(name, initial_deposit)
    accounts.push({name: name, balance: initial_deposit}) unless initial_deposit < 200
  end

  def find_account(name)
    found = accounts.find do |customer|
      customer[:name] == name
    end
  end

  def return_balance(name)
    account = find_account(name)
    return account[:balance]
  end

  def withdraw(name, amount)
    account = find_account(name)
    if account[:balance] > amount
      account[:balance] = account[:balance] - amount
    else
      account[:balance] -= 30.00
    end
  end

  def deposit(name, amount)
    account = find_account(name)
    account[:balance] += amount
  end

end
