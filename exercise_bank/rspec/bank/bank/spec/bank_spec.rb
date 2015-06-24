require 'spec_helper'
require 'pry'
require_relative '../lib/bank'

describe Bank do
  it "can be instantiated" do
    bank = Bank.new("J.P. Chase Morgan")
    expect(bank.class).to be(Bank)
  end

  describe "a newly instantiated bank" do
    ##################################################################################
    ####IMPORTANT. THE LINE BELOW SETS UP A VARIABLE, bank, THAT REPRESENTS A NEW BANK
    ####           WE USE THAT VARIABLE THROUGHOUT THE FILE!
    ##################################################################################
    let(:bank) { Bank.new("Wisconsin State Bank") }
    it "has a name" do
      expect(bank.name).to eq("Wisconsin State Bank")
    end

    it "has no accounts" do
      accounts = bank.accounts
      expect(accounts.empty?).to eq(true)
    end

    # the '#' sign stands for instance method, so #open_account means the object's
    # open_account method.
    describe "#open_account" do

      context "when the opening deposit is > 200.00" do

        it "adds the account" do
          bank.open_account("Andy Dufresne", 350_000.00)
          accounts = bank.accounts
          account_holder = accounts.last[:name]
          expect(account_holder).to eq("Andy Dufresne")
        end

      end # context - when opening deposit > 200.00

      context "when the opening deposit is 200.00" do
        it "adds the account" do
          bank.open_account("Phil Lamplugh", 200.00)
          accounts = bank.accounts
          account_holder = accounts.last[:name]
          expect(account_holder).to eq("Phil Lamplugh")
        end
      end # context - when opening deposit 200.00

      context "when the opening deposit is < 200.00" do

        it "it doesn't add the account" do
          bank.open_account("Travis", 198.00)
          accounts = bank.accounts
          expect(accounts.empty?).to eq(true)
        end

      end # context - when opening deposit < 200.00
    end # describe - #open_account

    # a bank should be able to locate a certain users account
    describe "#find_account" do

      context "when the user has an account" do
        before(:each) do
          bank.open_account("Mike Ekvall", 3_950.55)
        end

        it "returns the correct account" do
          account = bank.find_account("Mike Ekvall")
          expect(account[:balance]).to eq(3_950.55)
        end

      end # context - when the user has an account

    end # describe - #find_account

    describe "#return_balance" do

      context "when the user has an account" do
        before(:each) do
          bank.open_account("Sam Eldred", 5500.00)
        end

        it "should tell us the balance for the user" do
          sams_balance = bank.return_balance("Sam Eldred")
          expect(sams_balance).to eq(5500.00)
        end

      end #context - when the user has an account

    end # return balance

    # describes the .withdraw instance method
    describe "#withdraw" do

      context "when a user has an account" do
        before(:each) do
          bank.open_account("Travis Vander Hoop", 250.00)
        end

        context "when the user has enough money" do

          it "takes the specified amount from the account" do
            travs_account = bank.find_account("Travis Vander Hoop")
            balance_before = travs_account[:balance]
            bank.withdraw("Travis Vander Hoop", 200)
            balance_after = travs_account[:balance]
            difference = balance_before - balance_after
            expect(difference).to eq(200)
          end

        end # context - when user has enough

        context "when the user doesn't have enough money" do
          before(:each) do
            bank.open_account("Tony McGibbon", 232.00)
          end

          it "docks the user $30.00" do
            tonys_account = bank.find_account("Tony McGibbon")
            balance_before = tonys_account[:balance]
            bank.withdraw("Tony McGibbon", 350.00)
            balance_after = tonys_account[:balance]
            expect(balance_before - balance_after).to eq(30.00)
          end

        end # context - when user doesn't have enough

      end # context - when user has account

    end # describe - withdraw

    describe "#deposit" do

      context "when a user has an account" do
        let(:trav_account){ bank.find_account("Travis Vander Hoop") }
        before(:each) do
          bank.open_account("Travis Vander Hoop", 250.00)
        end

        it "adds to the users balance" do
          initial_balance = trav_account[:balance]
          bank.deposit("Travis Vander Hoop", 2450.00)
          balance_after = trav_account[:balance]
          expect(initial_balance < balance_after).to eq(true)
        end

        it "adds the specified amount to the users account" do
          initial_balance = trav_account[:balance]
          bank.deposit("Travis Vander Hoop", 230.00)
          balance_after = trav_account[:balance]
          expect(balance_after - initial_balance).to eq(230.00)
        end

      end # context - when user has an account

    end # describe - #deposit

  end # describe - newly instantiated bank

end # describe - Bank
